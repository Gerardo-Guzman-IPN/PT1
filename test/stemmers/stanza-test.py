import stanza

nlp = stanza.Pipeline(lang='es', processors='tokenize,mwt,pos,lemma')

file = open('../assets/restest.txt', 'r', encoding='utf8')
raw_text = file.read()
doc = nlp('hoy', 'restaurantes', 'han',
    'incursionado', 'adquisición', 'mejor',
    'encuentran', 'presentes', 'brinda',
    'hacia', 'debido', 'interacción',
    'actualmente')

print()
for sentence in doc.sentences:
    for word in sentence.words:
        print(word)

