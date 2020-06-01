import stanza

nlp = stanza.Pipeline(lang='es', processors='tokenize,mwt,pos,lemma')

file = open('../assets/restest.txt', 'r', encoding='utf8')
text = file.read()
doc = nlp('ENCUENTRA encuentra')

for sentence in doc.sentences:
    for word in sentence.words:
        print(word.text, '->', word.lemma)

