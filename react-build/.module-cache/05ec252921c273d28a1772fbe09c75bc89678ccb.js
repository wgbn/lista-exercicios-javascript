var meuApp = {
    _lista: [], // lista de tarefas
    _btnInserir: null, // botao de inserir

    init: function(){
        // adiciona evento ao botao de inserir
        meuApp._btnInserir = document.querySelector('.barra button').addEventListener('click', meuApp.inserirTarefa);

        // verifica se há uma lista na memoria
        if (localStorage.getItem('minhaLista') != null){
            // pega esta lista
            meuApp._lista = JSON.parse(localStorage.getItem('minhaLista'));
        }

        // exibe a lista
        meuApp.printTarefas();
    },

    printTarefas: function(){
        // pega o elemento que contará a lista
        var _tagLista = document.querySelector('.lista');

        // limpa a lista
        _tagLista.innerHTML = '';

        // testa se há elemntos na lista
        if (meuApp._lista.length > 0){

            // percorre a lista
            meuApp._lista.forEach(function(_val,_key){

                // cria o elemento 'item'
                var _htm = document.createElement('div');
                _htm.setAttribute('class', 'item');
                _htm.setAttribute('id', 'tarefa-'+_key);
                _htm.setAttribute('data-id', _key);

                // cria o elemento 'status'
                var _status = document.createElement('div');
                _status.setAttribute('class', 'status '+(_val.status ? 'fundo-verde':'fundo-vermelho'));
                _status.setAttribute('data-id',_key);
                _status.innerHTML = "&nbsp;";
                // adiciona 'status' a 'item'
                _htm.appendChild(_status);

                // cria o elemento 'texto'
                var _texto = document.createElement('div');
                _texto.setAttribute('class', 'texto '+(_val.status ? 'concluido':''));
                _texto.setAttribute('data-id',_key);
                _texto.innerHTML = _val.tarefa;

                // adiciona 'texto' a 'item'
                _htm.appendChild(_texto);

                // cria o elemento 'del'
                var _del = document.createElement('div');
                _del.setAttribute('class', 'del');
                _del.setAttribute('data-id', _key);
                _del.innerHTML = 'X';

                // adiciona 'del' a 'item'
                _htm.appendChild(_del);

                // cria o evento de clique no item
                _htm.addEventListener('click', meuApp.marcarTarefa);

                // adiciona o 'item' a lista na pagina
                _tagLista.appendChild(_htm);

            });

        } else {
            // se não houver nenhuma tarefa exibe a mensagem
            _tagLista.innerHTML = '<em>Nenhuma tarefa...</em>';
        }
    },

    inserirTarefa: function(e){
        // pega o elemento textinpu de inserção de tarefa
        var _txt = document.getElementById('tarefa');

        // testa se foi preenchido
        if (_txt.value.length > 0){
            // incrementa a lista de tarefas
            meuApp._lista.push({tarefa: _txt.value, status: 0});

            // salva na memória
            localStorage.setItem('minhaLista', JSON.stringify(meuApp._lista));

            // atualiza a lista na pagina
            meuApp.printTarefas();

            // limpa o textinput
            _txt.value = '';
        } else {
            // exibe erro ao usuario
            alert('Escreva uma tarefa');
        }
    },

    marcarTarefa: function(e){
        // testa se foi clicado apagar tarefa
        if (e.target.className == 'del'){
            // remove da lista de tarefas
            meuApp._lista.splice(this.dataset.id, 1);

            // atualiza a lista na página
            meuApp.printTarefas();
        } else {
            // altera o valor do status da tarefa na lista de tarefas
            meuApp._lista[this.dataset.id].status = !meuApp._lista[this.dataset.id].status;

            // altera a formatação do texto na tarefa
            this.children[1].setAttribute('class', 'texto'+(meuApp._lista[this.dataset.id].status ? ' concluido':''));

            // altera a cor do status da tarefa
            this.children[0].setAttribute('class', 'status '+(meuApp._lista[this.dataset.id].status ? 'fundo-verde':'fundo-vermelho'));
        }

        // salva na memória
        localStorage.setItem('minhaLista', JSON.stringify(meuApp._lista));
    }

};

// inicia a lista de tarefas
meuApp.init();
