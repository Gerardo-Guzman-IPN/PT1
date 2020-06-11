import Stemmer

stemmer = Stemmer.Stemmer('spanish')

print(stemmer.stemWords([
    'sus', 'clientes', 'los', 'se'
    ]))

