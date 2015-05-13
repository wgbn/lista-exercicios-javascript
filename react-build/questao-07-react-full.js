var _lista = [];

var ListaTarefas = React.createClass({displayName: "ListaTarefas",
    lista: [],
    getInitialState: function(){
        console.info('ListaTarefas::getInitialState()');
        return { sts: new Date().getTime() };
    },

    componentDidMount: function(){
        console.info('ListaTarefas::componentDidMount()');
        if (localStorage.getItem('minhaLista') != null){
            _lista = JSON.parse(localStorage.getItem('minhaLista'));
            //this.setState({lista: _lista});
            this.lista = _lista;
            this.setState({sts: new Date().getTime()});
        }
    },

    handleNovaTarefa: function(){
        console.info('ListaItens::handleNovaTarefa()');

        this.lista = _lista;
        this.setState({sts: new Date().getTime()});
        console.log(this.state.sts);
    },

    render: function(){
        console.info('ListaTarefas::render()');
        console.log(this.lista);
        return (
            React.createElement("main", {className: "geral"},
                React.createElement("h1", null, "Lista de Tarefas"),

                React.createElement(ListaForm, {onNovaTarefa: this.handleNovaTarefa}),

                React.createElement(ListaItens, {data: this.lista, onAtualiza: this.handleNovaTarefa})
            )
        );
    }
});

var ListaItens = React.createClass({displayName: "ListaItens",
    handleMudarEstado: function(e){
        console.info('ListaItens::handleMudarEstado()');
        this.props.onAtualiza();
    },

    render: function(){
        console.info('ListaItens::render()');
        var self = this;
        var todasTarefas = this.props.data.map(function (_val, _key){
            return React.createElement(ItemLista, {chave: _key, tarefa: _val.tarefa, status: _val.status, onMudarEstado: self.handleMudarEstado});
        });

        return (
            React.createElement("section", {className: "lista"},
                todasTarefas
            )
        );
    }
});

var ItemLista = React.createClass({displayName: "ItemLista",
    getInitialState: function() {
        console.info('ListaItem::getInitialState()');
        return {status: this.props.status || false};
    },

    marcarTarefa: function(e){
        console.info('ListaItem::marcarTarefa()');
        // testa se foi clicado apagar tarefa
        if (e.target.className == 'del'){
            console.info('ListaItem::marcarTarefa() -> del()');
            // remove da lista de tarefas
            _lista.splice(e.target.dataset.id, 1);
            // atualiza localStorage
            localStorage.setItem('minhaLista', JSON.stringify(_lista));
            // remove da lista
            //document.querySelector('.lista').removeChild(document.getElementById('tarefa-'+e.target.dataset.id));
        } else {
            console.info('ListaItem::marcarTarefa() -> altera()');
            // altera o valor do status da tarefa na lista de tarefas
            _lista[e.target.dataset.id].status = !_lista[e.target.dataset.id].status;
            _lista[e.target.dataset.id].timestamp = new Date().getTime();
            // atualiza localStorage
            localStorage.setItem('minhaLista', JSON.stringify(_lista));

            // altera a formatação do texto na tarefa
            //e.target.setAttribute('class', 'texto'+(_lista[e.target.dataset.id].status ? ' concluido':''));

            // altera a cor do status da tarefa
            //document.getElementById("status-"+e.target.dataset.id).setAttribute('class', 'status '+(_lista[e.target.dataset.id].status ? 'fundo-verde':'fundo-vermelho'));
        }

        this.props.onMudarEstado();
    },

    /*toggle: function() {
        console.info('ListaItem::toggle()');
        this.setState({status: !this.state.status});
    },*/

    render: function(){
        console.info('ListaItem::render()');
        var _status = (this.state.status ? 'fundo-verde':'fundo-vermelho');
        var _texto = (this.state.status ? ' concluido':'');
        return (
            React.createElement("div", {className: "item", id: "tarefa-"+this.props.chave, "data-id": this.props.chave, onClick: this.marcarTarefa},
                React.createElement("div", {className: "status "+_status, id: "status-"+this.props.chave, "data-id": this.props.chave}, " "),
                React.createElement("div", {className: "texto"+_texto, id: "text-"+this.props.chave, "data-id": this.props.chave}, this.props.tarefa),
                React.createElement("div", {className: "del", id: "del-"+this.props.chave, "data-id": this.props.chave}, "X")
            )
        );
    }
});

var ListaForm = React.createClass({displayName: "ListaForm",
    inserirTarefa: function(){
        console.info('ListaForm::inserirTarefa()');
        var _campo = React.findDOMNode(this.refs.tarefa);

        if (_campo.value.length > 0){
            _lista.push({tarefa: _campo.value, status: false, timestamp: new Date().getTime()});
            localStorage.setItem('minhaLista', JSON.stringify(window._lista));
            _campo.value = '';

            this.props.onNovaTarefa();
        } else {
            alert('Preencha uma tarefa');
        }
    },

    /*handleMudar: function(){
        console.info('ListaForm::inserirTarefa()');
        this.props.onAtualiza();
    },*/

    render: function(){
        console.info('ListaForm::render()');
        return (
            React.createElement("section", {className: "barra clearfix"},
                React.createElement("input", {type: "text", ref: "tarefa", maxlength: "1000"}),
                React.createElement("button", {onClick: this.inserirTarefa}, "inserir")
            )
        );
    }
});

React.render(React.createElement(ListaTarefas, null), document.querySelector('.container'));
