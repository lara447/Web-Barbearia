class Barbershop: 

    #parametros
    def __init__(self, id_barbearia: str, nome: str, cnpj: str, descricao: str, telefone: str):
        self.__id_barbearia = id_barbearia 
        self.__nome = nome 
        self.__nome = nome
        self.__cnpj = cnpj
        self.__descricao = descricao
        self.__telefone = telefone 
        self.__ativa = True 

    @property
    def id_barbearia(self):
        return self.__id_barbearia

    @property 
    def nome(self):
        return self.__nome

    @property
    def cnpj(self):
        return self.__cnpj

    @property
    def descricao(self):
        return self.__descricao
    
    @property
    def telefone(self):
        return self.__telefone
    @property
    def ativa(self):
        return self.__ativa

    #setters

    @nome.setter
    def nome(self, novo_nome: str):
        if not novo_nome.strip():
            raise ValueError("O nome da barbearia não pode ser vazio.")
        self.__nome = novo_nome
    
    @descricao.setter
    def descricao(self, nova_descricao: str):
        self.__descricao = nova_descricao
    
    @telefone.setter
    def telefone(self, novo_telefone: str):
        if not novo_telefone.strip():
            raise ValueError("O telefone não pode ser vazio.")
        self.__telefone = novo_telefone

    #metodos
    def ativar(self):
        if not self.pode_ser_ativada():
            raise ValueError("A barbearia não possui os dados necessários.")
        self.__ativa = True

    def desativar(self):
        self.__ativa = False
        
    def atualizar_dados(self, nome: str, descricao: str, telefone: str):
        if not nome.strip():
            raise ValueError("O nome da barbearia não pode ser vazio.")

        if not telefone.strip():
            raise ValueError("O telefone não pode ser vazio.")
        
        self.__nome = nome 
        self.__descricao = descricao
        self.__telefone = telefone

    def pode_ser_ativada(self) -> bool:
        return (
            bool(self.__nome.strip())
            and bool(self.__cnpj.strip())
            and bool(self.__telefone.strip())
        )
    def calcular_nota_media(self, notas: list[float]) -> float:
        if not notas:
            return 0.0 
        return sum(notas) / len(notas)