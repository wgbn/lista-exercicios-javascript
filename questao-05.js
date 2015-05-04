var Empregado = function(_nome, _sobrenome, _salario){
    var nome            = _nome;
    var sobrenome       = _sobrenome;
    var salarioMensal   = _salario;

    this.calcularSalarioAno = function(){
        return salarioMensal * 12;
    }

    this.dadosEmpregado = function(){
        return nome + " " + sobrenome + ", Salário: " + salarioMensal;
    }
};
