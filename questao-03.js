var style = function(_elemento, _atributo, _valor) {
    // pega no DOM o elemento passado
    _elemento = document.querySelectorAll(_elemento);

    // testa se o elemrnto existe no DOM
    if (_elemento.length > 0)
        // se existe, pega o valor do atributo passado
        _valor = _elemento[0].style[_atributo];
    // se o elemento nao existe retorna o valor padrao doi atributo passado

    // retorna o valor do atributo, caso nao exista um valor passado retorna 'sem valor'
    return _valor = _valor || 'sem valor';
};

var assert = function(_func, _res){
    return _func === _res ? true : false;
};
