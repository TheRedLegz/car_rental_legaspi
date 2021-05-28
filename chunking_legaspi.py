import nltk
from nltk import Tree
import re
 
class GrammarParse:

    # Key note about the grammar. You add a space + ? between the tags, change the <> to (), and add \w*/ before each tag
    # i.e
    # <DT>?<JJ>*<NN> to
    # (\w*/DT)? ?(\w*/JJ)* ?(\w*/NN)
    def regExParse(self, chunk_name, grammar, sentence):
        tokens = nltk.word_tokenize(sentence)
        pos_tags = nltk.pos_tag(tokens)

        temp_string = ""
        for x in pos_tags:
            temp_string += x[0] + "/" +  x[1] + " "
        
        sentence = temp_string

        matches = re.findall(grammar, sentence)
        sentence = re.sub(grammar, "| ", sentence)

        sentence = "(S " + sentence + ")"

        for i in range(len(matches)):
            temp_sentence = "(" + chunk_name + " "
            for j in range(len(matches[i])):
                temp_sentence += matches[i][j] + " "
            temp_sentence += ")"
            sentence = sentence.replace("|", temp_sentence, 1)
        print(sentence)

        return sentence
if __name__ == "__main__":
    parser = GrammarParse()
    # sentence = "The quick brown fox jumps over the lazy dog"
    sentence = "I was hugging an amazing spectacular dog"
    # result = parser.regExParse("NP", "(\w*/DT)? ?(\w*/JJ)* ?(\w*/NN)", sentence)
    result = parser.regExParse("VP", "(\w*/VB\w*) ?(\w*/DT)? ?(\w*/JJ)* ?(\w*/NN) ?(\w*/RB\w?)?", sentence)

    tr = Tree.fromstring(result)
    print(tr)
    tr.draw()