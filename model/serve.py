from flask import Flask, request
from tensorflow import keras
import numpy as np
import json
import openai

#LLM
openai.api_key = "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"

#Loadamo model
model = keras.models.load_model("model")

#Vzroki
vzroki = ['Allergies', 'Anal gland problems', 'Ascites ', 'Autoimmune disease', 'Brain tumor', 'Canine distemper', 'Canine influenza', 'Cold ', 'Collapsed trachea', 'Coprophagia', 'Dehydration ', 'Dental disease', 'Diet-related factors', 'Ear infection', 'Enzyme deficiencies', 'Fecal incontinence', 'GDV', 'Gastroenteritis ', 'Gastrointestinal obstruction', 'Heart disease', 'Hormonal imbalances', 'Immune response ', 'Infections', 'Inflammation ', 'Inflammatory bowel disease', 'Inner ear problems', 'Intestinal parasites', 'Kennel cough', 'Malabsorption issues', 'Medications/side effects', 'Neurological disorders', 'Oral infections', 'Pancreatitis', 'Parasites', 'Periodontal disease ', 'Poisoning ', 'Rectal prolapse', 'Stress', 'Stroke', 'UTI', 'Vestibular disease']

#Server
app = Flask(__name__)
@app.route('/diagnoza', methods = ['POST'])
def predict():
    if request.method == 'POST':

        #Preberemo simpitmoe
        payload = request.json
        input = [payload['Abdomen pain'], payload['Bad breath'], payload['Circling'], payload['Constipation'], payload['Coughing'], payload['Diarrhea'], payload['Dizzines'], payload['Dragging bottom'], payload['Drooling'], payload['Eating stool'], payload['Fever'], payload['Hair loss'], payload['Losing balance'], payload['Shivering'], payload['Swollen abdomen'], payload['Vomit']]
        
        #Napovemo vrednosti
        temp = model.predict([input])

        #Vzamemo top 3
        top_indices = np.argsort(temp)[0, ::-1][:3]
        top_values = temp[0, top_indices]

        #Pridobimo opis z llm
        navodila = "Disregard all previous messages. I will provide you with a list of 3 diseases/causes and their respective percentages that may affect a dog. The list is: " + vzroki[top_indices[0]]  + ": " + str(int(top_values[0]*100)) + "%, " + vzroki[top_indices[1]]  + ":" + str(int(top_values[1]*100)) + "%, " + vzroki[top_indices[2]]  + ":" + str(int(top_values[2]*100)) + "%. I want you to give me a very brief summary of what these diseases are(75-100 words for each), and tips on how to remedy them. Do not open your reply with something like 'Certainly! Here's a....', rather only provide the requested information. You are to respond with 3 paragraphs, 1 for each disease. In your response, provide the given percentages in normal brackets after the disease. Do not include double qoute symbol anywhere in your response."
        text = openai.Completion.create(model="text-davinci-003",prompt=navodila,max_tokens=1000,temperature=1)
        opis = text['choices'][0]['text'].lstrip('\n')

        #Vrnemo odgovor
        odgovor = json.dumps({vzroki[top_indices[0]] : str(int(top_values[0]*100)), vzroki[top_indices[1]] : str(int(top_values[1]*100)), vzroki[top_indices[2]] : str(int(top_values[2]*100)), "opis" : opis})
        return odgovor
@app.route('/trening', methods = ['POST'])
def marko():
    if request.method == 'POST':

        #Preberemo simpitmoe
        payload = request.json        
        print(payload)

        #Pridobimo opis z llm
        navodila = "Disregard all previous messages. I have a dog that is " + str(payload['starost']) + " years old and weighs " + str(payload['teza']) + "kg. I want you to give me a training plan that centers around " + str(payload['tip']) + " for my dog. Do not open your reply with something like 'Certainly! Here's a....', rather only provide the requested information. Also Make it 200-250 words. Do not include double qoute symbol anywhere in your response. Mention the dogs weight and age anywhere in your response."
        text = openai.Completion.create(model="text-davinci-003",prompt=navodila,max_tokens=1000,temperature=1)
        opis = text['choices'][0]['text'].lstrip('\n')

        #Vrnemo odgovor
        odgovor = json.dumps({"opis" : opis})
        return odgovor
    
#Zazenemo
app.run(host='0.0.0.0', port=1234)