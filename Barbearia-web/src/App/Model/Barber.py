class Barber:

    def __init__(self, id_barbeiro: int, descricao: str):
        self.__id_barbeiro = id_barbeiro
        self.__descricao = descricao
        self.__ativo = True 

    @property
    def id_barbeiro(self):
        return self.__id_barbeiro

    @property
    def descricao(self):
        return self.__descricao

    @property
    def ativo(self):
        return self.__ativo
    
    @descricao.setter
    def descricao(self, nova_descricao:str):
        if not nova_descricao.strip():
            raise ValueError("A descrição não pode ser vazia.")

        self.__descricao = nova_descricao

    def ativar (self):
        self.__ativo = True

    def desativar(self):
        self.__ativo = False

    def realiza_servico(self, servico) -> bool:

        raise NotImplementedError(
            "Relação entre barbeiro e serviço ainda não possui implementação"
        )

        def esta_disponivel(self, inicio, fim) -> bool:

            raise NotImplementedError(
                "A verificação de disponibilidade ainda não possui implementação"
            )