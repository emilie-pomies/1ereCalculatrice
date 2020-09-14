function Calculator()
{
    that        = this,//attribut de l'instance calculator
    this.field  = "input#number",
    this.button = "#body .buttons"
    this.init   = false,// mettre un 0 dans le input

    this.run = function()
    {
        $(this.button).click(function(){//qd n'importe quel bouton est cliquer
            let value =$(this).html();//a ce click on recupere la valeur du bouton


            if(that.init == false)// sert à enlever le 0 du input, ube fois qu'on clique sur une touche 
            {
               $(that.field).val("");
               that.init = true; 
            }

            if (value != "=")
                $(that.field).val($(that.field).val()+value);//notre champ a pour valeur , la valeur actuelle du champ + la nouvelle valeur
        
            that.dispacher(value);
        });
    },

    this.dispacher = function(value)//elle sert a nous orienter sur quelle operation executer suivant le symbole
    {
        if($(this.field).val().indexOf("/") != -1)
            this.operation(value, "/");
        if($(this.field).val().indexOf("*") != -1)
            this.operation(value, "*");
        if($(this.field).val().indexOf("-") != -1)
            this.operation(value, "-");
        if($(this.field).val().indexOf("+") != -1)
            this.operation(value, "+");
    },

    this.operation = function(value, symbol)
    {
        let numbers = $(this.field).val().split(symbol),//split permet de separer les valeurs en forme de tableau
            result;

        if(symbol == "/")
            result = numbers[0] / numbers[1];
        if(symbol == "*")
            result = numbers[0] * numbers[1];
        if(symbol == "-")
            result = numbers[0] - numbers[1];
        if(symbol == "+")
            result = parseFloat(numbers[0]) + parseFloat(numbers[1]);// pour eviter que le plus concataine les chiffres, on passe les 2 valeurs en parseFloat
        
        result = Math.round((result) *100) / 100;//Pour avoir 2 chiffres apprès la virgule
   
        if(numbers.length > 1)
        {
            if(value == "=")//si la valeur cliqué est =, alors on affiche le resultat
                $(this.field).val(result);    
            else if (numbers.length > 2)
                $(this.field).val(result+symbol || result-symbol || result*symbol || result/symbol );
        }
    }
}