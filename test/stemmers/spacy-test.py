import spacy

nlp = spacy.load('es_core_news_md')

file = open('../assets/restest.txt', 'r', encoding='utf8')
raw_text = file.read()

doc = nlp(raw_text.lower())

for token in doc:
    print(token.text, token.lemma_, token.pos_)

