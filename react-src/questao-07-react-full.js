var _lista = [];

var ListaTarefas = React.createClass({
    componentDidMount: function(){
        if (localStorage.getItem('minhaLista') != null)
            window._lista = JSON.parse(localStorage.getItem('minhaLista'));
    },

    render: function(){
        return (
            <main className="geral">
                <h1>Lista de Tarefas</h1>

                <ListaForm />

                <ListaItens lista={window._lista} />
            </main>
        );
    }
});

var ListaForm = React.createClass({
    componentDidMount: function(){
        this._campo = document.querySelector('#tarefa');
    },

    inserirTarefa: function(){
        if (this._campo.value.length > 0){
            window._lista.push({tarefa: this._campo.value, status: 0});
            localStorage.setItem('minhaLista', JSON.stringify(window._lista));
            this._campo.value = '';
        } else {
            alert('Preencha uma tarefa');
        }
    },

    render: function(){
        return (
            <section className="barra clearfix">
                <input type="text" id="tarefa" maxlength="1000" />
                <button onClick={this.inserirTarefa}>inserir</button>
            </section>
        );
    }
});

var ListaItens = React.createClass({
    getInitialState: function(){
        return { lista: this.props.lista };
    },

    componentDidMount: function(){
        console.log(this.state.lista);
    },

    render: function(){
        var todasTarefas = this.state.lista.map(function (_val, _key) { console.log(_val);
            return <ItemLista chave={_key} tarefa={_val.tarefa} status={_val.status} />;
        });

        return (
            <section className="lista">
                {todasTarefas}
            </section>
        );
    }
});

var ListaItem = React.createClass({
    marcarTarefa: function(e){
        // testa se foi clicado apagar tarefa
        if (e.target.className == 'del'){
            // remove da lista de tarefas
            this.props.lista.splice(e.target.dataset.id, 1);
        } else {
            // altera o valor do status da tarefa na lista de tarefas
            this.props.lista[e.target.dataset.id].status = !this.props.lista[e.target.dataset.id].status;

            // altera a formatação do texto na tarefa
            e.target.setAttribute('class', 'texto'+(this.props.lista[e.target.dataset.id].status ? ' concluido':''));

            // altera a cor do status da tarefa
            document.getElementById("status-"+e.target.dataset.id).setAttribute('class', 'status '+(this.props.lista[e.target.dataset.id].status ? 'fundo-verde':'fundo-vermelho'));
        }
    },

    getInitialState: function() {
        return {status: this.props.status || 0};
    },

    toggle: function() {
        this.setState({status: !this.state.status});
    },

    render: function(){
        return (
            <div className="item" id={"tarefa-"+this.props.chave} data-id={this.props.chave} onClick={this.marcarTarefa}>
                <div className={"status "+_status} id={"status-"+this.props.chave} data-id={this.props.chave}>&nbsp;</div>
                <div className="texto " id={"text-"+this.props.chave}  data-id={this.props.chave}>{this.props.tarefa}</div>
                <div className="del" id={"del-"+this.props.chave} data-id={this.props.chave}>X</div>
            </div>
        );
    }
});

React.render(<ListaTarefas />, document.querySelector('.container'));
