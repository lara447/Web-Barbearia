
class Adress:
    
    def __init__(self, id_endereco: int, logradouro: str, numero: str, complemento: str, bairro: str, cidade: str, estado: str, cep: str, latitude: float, longitude: float):
        self.__id_endereco = id_endereco
        self.__logradouro = logradouro
        self.__numero = numero
        self.__complemento = complemento
        self.__bairro = bairro
        self.__cidade = cidade
        self.__estado = estado
        self.__cep = cep
        self.__latitude = latitude
        self.__longitude = longitude

    
    @property
    def id_endereco(self):
        return self.__id_endereco

    @property
    def logradouro(self):
        return self.__logradouro

    @property
    def numero(self):
        return self.__numero

    @property
    def complemento(self):
        return self.__complemento

    @property
    def bairro(self):
        return self.__bairro

    @property
    def cidade(self):
        return self.__cidade

    @property
    def estado(self):
       return self.__estado
    @property
    def cep(self):
        return self.__cep
        
    @property
    def latitude(self):
        return self.__latitude
        
    @property
    def longitude (self):
        return self.__longitude

    def eh_valido(self) -> bool:
        return (
            bool(self.__logradouro.strip())
            and bool(self.__numero.strip())
            and bool(self.__bairro.strip())
            and bool(self.__cidade.strip())
            and bool(self.__estado.strip())
            and bool(self.__cep.strip())
            and -90 <= self.__latitude <= 90
            and -180 <= self.__longitude <=180
        )

        def calcular_distancia(self, latitude: float, longitude:float) -> float:
            pass
        
    