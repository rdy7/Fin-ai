import os
import time
import json
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from pypdf import PdfReader

# Load environment variables
load_dotenv()

# Configure Gemini / Gemma
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = None
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment.")
else:
    client = genai.Client(api_key=GEMINI_API_KEY)


app = FastAPI(title="FinAI Core - Gemma 3 Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary storage for extracted text
extracted_data_store = {}

class ExtraordinaryEvent(BaseModel):
    description: str
    value: float
    type: str
    category: str

class AnalysisRequest(BaseModel):
    file_id: str
    adjustments: List[ExtraordinaryEvent]

@app.get("/")
def read_root():
    return {"status": "FinAI Backend Running", "engine": "Gemma 3 27B"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Somente arquivos PDF são suportados no momento.")
    
    file_id = f"file_{int(time.time())}"
    
    try:
        # Reset file pointer just in case
        file.file.seek(0)
        
        # Extract text from PDF
        reader = PdfReader(file.file)
        full_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
        
        if not full_text.strip():
            # If no text extracted, might be a scanned PDF or empty
            full_text = "O PDF parece estar vazio ou é uma imagem (necessita OCR)."
        
        # Store text in memory
        extracted_data_store[file_id] = {
            "filename": file.filename,
            "text": full_text
        }
        
        return {
            "file_id": file_id,
            "filename": file.filename,
            "status": "ready_for_adjustments"
        }
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"DEBUG ERROR: {error_details}")
        raise HTTPException(status_code=500, detail=f"Erro ao ler PDF: {str(e)}")


@app.post("/analyze")
async def analyze_financials(request: AnalysisRequest):
    if request.file_id not in extracted_data_store:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado ou sessão expirada.")
    
    file_info = extracted_data_store[request.file_id]
    doc_text = file_info["text"]
    
    # Prepare adjustments context
    adjustments_str = "\n".join([
        f"- {a.description}: {a.type.upper()} de R$ {a.value} ({a.category})" 
        for a in request.adjustments
    ])

    prompt = f"""
    Você é um analista financeiro sênior especializado em DRE e Balanço Patrimonial.
    Abaixo está o texto extraído de um relatório financeiro e alguns ajustes manuais de eventos não recorrentes fornecidos pelo usuário.

    TEXTO DO RELATÓRIO:
    {doc_text[:10000]} # Limiting to 10k chars for safety, though Gemma 3 handles more

    AJUSTES MANUAIS (EVENTOS NÃO RECORRENTES):
    {adjustments_str}

    TAREFA:
    1. Analise o texto e extraia os principais dados da DRE (Receita, Custos, EBITDA, Lucro Líquido). Procure ativamente por períodos comparativos (ex: Ano Atual vs Ano Anterior).
    2. O 'value' deve ser sempre o período mais recente (Ano Atual). O 'previous_value' deve ser o período mais antigo (Ano Anterior). Se não houver período comparativo, defina 'previous_value' como null.
    3. Analise o Balanço Patrimonial (Ativos e Passivos principais).
    4. Aplique os AJUSTES MANUAIS ao período atual para calcular um 'Lucro Líquido Ajustado' e 'EBITDA Ajustado'.
    5. Retorne APENAS um JSON estruturado com o seguinte formato:

    {{
        "summary": {{
            "revenue": float,
            "previous_revenue": float | null,
            "ebitda": float,
            "previous_ebitda": float | null,
            "net_income": float,
            "previous_net_income": float | null,
            "adjusted_impact": float (soma dos ganhos - soma das perdas dos ajustes manuais)
        }},
        "dre": [
            {{ "name": str, "value": float, "previous_value": float | null, "type": "positive" | "negative" | "total" }}
        ],
        "balance_sheet": {{
            "assets": [ {{ "name": str, "value": float }} ],
            "liabilities": [ {{ "name": str, "value": float }} ]
        }}
    }}

    IMPORTANTE: 
    - Use valores numéricos positivos para receitas e ativos.
    - Use valores negativos para custos e despesas na DRE.
    - Retorne APENAS JSON válido, sem formatação markdown.
    """

    try:
        if not client:
            raise HTTPException(status_code=500, detail="API Client não configurado.")

        response = client.models.generate_content(
            model="gemma-3-27b-it",
            contents=prompt
        )
        
        # Parse JSON from response
        raw_text = response.text.strip()

        if raw_text.startswith("```json"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()
        
        analysis_data = json.loads(raw_text)
        return analysis_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na análise de IA: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
