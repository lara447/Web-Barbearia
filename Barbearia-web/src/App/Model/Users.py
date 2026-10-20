class Usuario:

    #parametros 
    def __init__(self, id_usuario: int , nome: str, email: str, senha_hash: str, telefone: str):

        self.__id_usuario = id_usuario
        self.__nome = nome 
        self.__email = email
        self.__senha_hash = senha_hash
        self.__telefone = telefone
        self.__ativo =True

    #getters
    @property
    def id_usuario(self):
        return self.__id_usuario

    @property
    def nome(self):
        return self.__nome
    
    @property
    def email(self):
        return self.__email
    
    @property
    def senha_hash(self):
        return self.senha_hash

    @property
    def telefone(self):
        return self.__telefone

    #adição de uma classe para fazer alterações dos dados com regras 
    def atualizar_dados(self, nome: str, email: str, telefone:str):
        if not nome.strip():
            raise ValueError("O nome não pode ser vazio.")
        if "@" not in email:
            raise ValueError("E-mail inválido.")
        if not telefone.strip():
            raise ValueError("O relefone não pode ser vazio.")

        self.__nome = nome 
        self.__email = email
        self.__telefone = telefone

    def ativar(self):
        self.__ativo = True
    def desativar(self):
        self.__ativo = False
    
    #método para valizdar a senha 
    def autenticar(self, senha: str) -> bool:
        pass