
//updateProductStatus
export type ProductoContextType = {
  dataProductos: ProductoBBDD[];
  updateProductStatus: (idProducto:string,nuevoEstado:string) => void;
};

export type ProductoBBDD = {    
    id: string; // UUID en string
    familia: string;
    nombre: string;
    code: string;
    precio1: number;
    precio2: number;
    precio3: number;
    cocina: boolean;
    seccion: string;
  };

  export enum EstadoProductoEnum {
    BARRA = "BARRA",
    POR_PEDIR = "POR_PEDIR",
    PEDIDO_A_COCINA = "PEDIDO_A_COCINA",
    EN_MARCHA_COCINA = "EN_MARCHA_COCINA",
    SALE_DE_COCINA = "SALE_DE_COCINA",
    PUESTO_EN_MESA = "PUESTO_EN_MESA"
  }
  
  
  export type ProductoInMesa = {
    id: string;
    mesaReferencia: string;
    productoReferencia: string;
    unidades: number;
    precio: number;
    nombre: string;
    code: string;
    fechaHoraPedido: Date;
    fechaHoraServido: Date;
    fechaHoraCreacion: Date;
    estado: EstadoProductoEnum;
    version: number;
  }  