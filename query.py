import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

client = chromadb.PersistentClient(
    path="./chroma_db2",
    settings=Settings(anonymized_telemetry=False)
)
collection = client.get_or_create_collection(name="incidents")

user_input = {
    "narrative_entry": "He always follows me around, even when I ask him not to.",
}

query_embedding = model.encode([user_input["narrative_entry"]]).tolist()

results = collection.query(
    query_embeddings=query_embedding,
    n_results=3
)

formatted_string = ""
for i, doc in enumerate(results["documents"][0]):
    metadata = results["metadatas"][0][i]
    age = metadata.get("age")
    location = metadata.get("location")
    relationship = metadata.get("relationship_to_perpetrator")
    severity = metadata.get("severity_score") 
    incident = metadata.get("incident_type")
    potential = metadata.get("potential_crime")
    formatted_string += f"{i+1}. \"{doc}\" Age: {age}. Location: {location}. Relationship to Perpetrator: {relationship} -> Incident type: {incident}. Severity Score: {severity}. Potential crime: {potential}\n"
print(formatted_string)