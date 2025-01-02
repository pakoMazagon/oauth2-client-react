const dataProductos = [
    {
        "familia": "bebidas",
        "nombre": "cerveza",
        "code": "cerveza",
        "precio1": 1.35,
        "precio2": 2.5,
        "precio3": 1.35,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "cerveza_sin_alcohol",
        "code": "cerveza_sin_alcohol",
        "precio1": 1.4,
        "precio2": 2.5,
        "precio3": 1.4,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "radler",
        "code": "radler",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "refresco",
        "code": "refresco",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "vino_blanco",
        "code": "vino_blanco",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "rioja",
        "code": "rioja",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "ribera_duero",
        "code": "ribera_duero",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "manzanilla",
        "code": "manzanilla",
        "precio1": 1.6,
        "precio2": 2.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "agua",
        "code": "agua",
        "precio1": 1.6,
        "precio2": 1.6,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "bebidas",
        "nombre": "tinto_verano",
        "code": "tinto_verano",
        "precio1": 1.6,
        "precio2": 3.0,
        "precio3": 1.6,
        "cocina": false
    },
    {
        "familia": "entrantes",
        "nombre": "tomate_aliniado",
        "code": "tomate_aliniado",
        "precio1": 4.0,
        "precio2": 4.0,
        "precio3": 4.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "tomate_melva",
        "code": "tomate_melva",
        "precio1": 6.0,
        "precio2": 6.0,
        "precio3": 6.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "ensalada",
        "code": "ensalada",
        "precio1": 3.2,
        "precio2": 3.2,
        "precio3": 3.2,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "ensalada_mixta",
        "code": "ensalada_mixta",
        "precio1": 3.5,
        "precio2": 3.5,
        "precio3": 3.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "jamon",
        "code": "jamon",
        "precio1": 18.0,
        "precio2": 18.5,
        "precio3": 18.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "queso",
        "code": "queso",
        "precio1": 16.0,
        "precio2": 17.0,
        "precio3": 16.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "anchoas_pimenta",
        "code": "anchoas_pimenta",
        "precio1": 21.0,
        "precio2": 21.5,
        "precio3": 21.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "anchoas_cantabrico",
        "code": "anchoas_cantabrico",
        "precio1": 19.5,
        "precio2": 20.0,
        "precio3": 19.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "anchoas_queso",
        "code": "anchoas_queso",
        "precio1": 24.0,
        "precio2": 24.5,
        "precio3": 24.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "pulpo_gallega",
        "code": "pulpo_gallega",
        "precio1": 14.0,
        "precio2": 14.5,
        "precio3": 14.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "pulpo_brasa",
        "code": "pulpo_brasa",
        "precio1": 14.0,
        "precio2": 14.5,
        "precio3": 14.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "kokotxa_merluza",
        "code": "kokotxa_merluza",
        "precio1": 19.5,
        "precio2": 20.0,
        "precio3": 19.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "mojama",
        "code": "mojama",
        "precio1": 13.5,
        "precio2": 14.5,
        "precio3": 13.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "pimentada",
        "code": "pimentada",
        "precio1": 7.5,
        "precio2": 7.5,
        "precio3": 7.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "pimentada_melva",
        "code": "pimentada_melva",
        "precio1": 9.0,
        "precio2": 9.5,
        "precio3": 9.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "gazpacho",
        "code": "gazpacho",
        "precio1": 3.5,
        "precio2": 3.5,
        "precio3": 3.5,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "salmorejo",
        "code": "salmorejo",
        "precio1": 4.0,
        "precio2": 4.0,
        "precio3": 4.0,
        "cocina": true
    },
    {
        "familia": "entrantes",
        "nombre": "pan",
        "code": "pan",
        "precio1": 3.5,
        "precio2": 3.5,
        "precio3": 3.5,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "gamba_extra",
        "code": "gamba_extra",
        "precio1": 42.0,
        "precio2": 42.5,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "langostinos",
        "code": "langostinos",
        "precio1": 15.0,
        "precio2": 0.0,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "cigalas",
        "code": "cigalas",
        "precio1": 17.0,
        "precio2": 0.0,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "ostra",
        "code": "ostra",
        "precio1": 5.0,
        "precio2": 5.0,
        "precio3": 5.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "coquina",
        "code": "coquina",
        "precio1": 16.0,
        "precio2": 16.5,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "chirla",
        "code": "chirla",
        "precio1": 14.0,
        "precio2": 14.5,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "mariscos",
        "nombre": "finas",
        "code": "finas",
        "precio1": 19.0,
        "precio2": 19.5,
        "precio3": 0.0,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "chocos",
        "code": "chocos",
        "precio1": 13.00,
        "precio2": 7.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "rosado",
        "code": "rosado",
        "precio1": 13.00,
        "precio2": 7.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "pijotas",
        "code": "pijotas",
        "precio1": 13.00,
        "precio2": 7.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "acedias",
        "code": "acedias",
        "precio1": 13.00,
        "precio2": 7.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "boquerones",
        "code": "boquerones",
        "precio1": 12.00,
        "precio2": 7.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "salmonetes",
        "code": "salmonetes",
        "precio1": 15.00,
        "precio2": 8.20,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "ortiguillas",
        "code": "ortiguillas",
        "precio1": 19.00,
        "precio2": 10.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "huevas_merluza",
        "code": "huevas_merluza",
        "precio1": 19.00,
        "precio2": 10.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "taquitos_rape",
        "code": "taquitos_rape",
        "precio1": 18.50,
        "precio2": 10.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "taquitos_corvina",
        "code": "taquitos_corvina",
        "precio1": 18.50,
        "precio2": 10.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "croquetas",
        "code": "croquetas",
        "precio1": 11.00,
        "precio2": 6.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "fritos",
        "nombre": "frito_variado",
        "code": "frito_variado",
        "precio1": 30.00,
        "precio2": 15.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_racion",
        "nombre": "huevo_choco",
        "code": "huevo_choco",
        "precio1": 19.50,
        "precio2": 10.70,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_racion",
        "nombre": "almendrita",
        "code": "almendrita",
        "precio1": 19.50,
        "precio2": 10.70,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_racion",
        "nombre": "huevas_merluza",
        "code": "huevas_merluza",
        "precio1": 19.00,
        "precio2": 10.50,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_racion",
        "nombre": "morrillo_atun",
        "code": "morrillo_atun",
        "precio1": 14.00,
        "precio2": 8.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "lenguado",
        "code": "lenguado",
        "precio1": 7.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "rodaballo",
        "code": "rodaballo",
        "precio1": 7.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "lubina",
        "code": "lubina",
        "precio1": 5.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "dorada",
        "code": "dorada",
        "precio1": 5.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "choco_entero",
        "code": "choco_entero",
        "precio1": 7.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "salmonete",
        "code": "salmonete",
        "precio1": 6.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "medallon_corvina",
        "code": "medallon_corvina",
        "precio1": 6.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "ventresca_atun",
        "code": "ventresca_atun",
        "precio1": 6.50,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    },
    {
        "familia": "plancha_pieza",
        "nombre": "bacalao",
        "code": "bacalao",
        "precio1": 16.00,
        "precio2": 0.00,
        "precio3": 0.00,
        "cocina": true
    }     
]

export default dataProductos;