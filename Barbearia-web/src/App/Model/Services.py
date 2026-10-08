class Services:

    def __init__(self, nome: str, valor: float, duracao: int):
        self.__nome = nome 
        self.__valor = valor 
        self.__duracao = duracao

    @property
    def nome(self):
        return self.__nome

    @property
    def valor(self):
        return self.__valor

    @property
    def duracao(self):
        return self.__duracao
    
    @nome.setter
    def nome (self, novo_nome:str):
        if not novo_nome.strip():
            raise ValueError("O nome do serviço não pode ser vazio.")
        self.__nome = novo_nome
        
    @valor.setter
    def valor(self, novo_valor:float):
        if novo_valor < 0:
            raise ValueError("O valor não pode ser negativo.")
        self.__valor = novo_valor
    
    @duracao.setter 
    def duracao(self, nova_duracao):
        if nova_duracao <= 0:
            raise ValueError("A duração deve ser maior que zero.")
            self.__duracao = nova_duracao

    def exibir_dados(self):
        print("\nSERVIÇO")
        print(f"Nome: {self.__nome}")
        print(f"Valor: R$ {self.__valor:.2f}")
        print(f"Duração: {self.__duracao} minutos")

