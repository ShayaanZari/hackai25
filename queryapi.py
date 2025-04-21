import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

model = SentenceTransformer('all-MiniLM-L6-v2')

client = chromadb.PersistentClient(
    path="./chroma_db2",
    settings=Settings(anonymized_telemetry=False)
)
collection = client.get_or_create_collection(name="incidents")

class QueryRequest(BaseModel):
    narrative_entry: str

@app.post("/query")
def query_similar(request: QueryRequest):
    narrative = request.narrative_entry.strip()
    print(narrative)
    embedding = model.encode([narrative]).tolist()
    results = collection.query(
        query_embeddings=embedding,
        n_results=3
        )
    
    formatted = ""
    for i, doc in enumerate(results["documents"][0]):
        metadata = results["metadatas"][0][i]
        age = metadata.get("age")
        location = metadata.get("location")
        relationship = metadata.get("relationship_to_perpetrator")
        severity = metadata.get("severity_score") 
        incident = metadata.get("incident_type")
        potential = metadata.get("potential_crime")
        formatted += f"{i+1}. \"{doc}\" Age: {age}. Location: {location}. Relationship to Perpetrator: {relationship} -> Incident type: {incident}. Severity Score: {severity}. Potential crime: {potential}\n"
    return {"examples": formatted.strip()}