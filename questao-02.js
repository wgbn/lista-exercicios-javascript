var _arr = ['Salvador','São Paulo','Rio de Janeiro','Tocantins'];

// pode ser feita uma função mais dinâmica:
var _novo = comecaCom(_arr, 's');

function comecaCom(_arr, _comeca){
    return _arr.filter(function(arr){
        return arr.charAt(0) == _comeca ? true : false;
    });
}

// ou pode ser feita pontualmente
var _novo = _arr.filter(function(arr){
    return arr.charAt(0) == 'S' ? true : false;
});
