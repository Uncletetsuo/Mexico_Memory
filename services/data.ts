import { Politician } from '../types';

export const MOCK_POLITICIANS: Politician[] = [
  {
    id: 'claudia-sheinbaum',
    name: 'Claudia Sheinbaum Pardo',
    party: 'MORENA',
    image: 'https://picsum.photos/seed/claudia/400/400',
    bio: 'Científica, política y académica mexicana. Fue Jefa de Gobierno de la Ciudad de México y es una figura central en la política contemporánea.',
    roles: [
      { title: 'Jefa de Gobierno de la CDMX', period: '2018 - 2023' },
      { title: 'Jefa Delegacional en Tlalpan', period: '2015 - 2017' },
      { title: 'Secretaria del Medio Ambiente DF', period: '2000 - 2006' }
    ],
    votes: [
      { subject: 'Reforma Eléctrica', result: 'A favor', date: '2022-04-17' },
      { subject: 'Presupuesto de Egresos', result: 'A favor', date: '2023-11-15' },
      { subject: 'Militarización de la Guardia Nacional', result: 'A favor', date: '2022-09-02' }
    ],
    initiatives: [
      { title: 'Beca Universal para Niños', status: 'Aprobada', date: '2019-01-01', description: 'Programa social para estudiantes de educación básica pública.' },
      { title: 'Digitalización de Trámites', status: 'Aprobada', date: '2020-05-12', description: 'Creación de la Agencia Digital de Innovación Pública.' }
    ]
  },
  {
    id: 'xochitl-galvez',
    name: 'Xóchitl Gálvez Ruiz',
    party: 'PAN',
    image: 'https://picsum.photos/seed/xochitl/400/400',
    bio: 'Ingeniera, empresaria y política mexicana. Ha sido Senadora de la República y Jefa Delegacional de Miguel Hidalgo.',
    roles: [
      { title: 'Senadora de la República', period: '2018 - 2023' },
      { title: 'Jefa Delegacional en Miguel Hidalgo', period: '2015 - 2018' },
      { title: 'Comisionada Nacional para el Desarrollo de los Pueblos Indígenas', period: '2003 - 2006' }
    ],
    votes: [
      { subject: 'Reforma Electoral (Plan B)', result: 'En contra', date: '2023-02-22' },
      { subject: 'Extinción de Fideicomisos', result: 'En contra', date: '2020-10-21' },
      { subject: 'Ley de Movilidad', result: 'A favor', date: '2022-04-05' }
    ],
    initiatives: [
      { title: 'Ley de Derechos de los Pueblos Indígenas', status: 'Pendiente', date: '2021-08-09', description: 'Reforma constitucional para el reconocimiento pleno de derechos.' },
      { title: 'Energías Limpias para PyMES', status: 'Rechazada', date: '2022-11-03', description: 'Incentivos fiscales para uso de paneles solares.' }
    ]
  },
  {
    id: 'marcelo-ebrard',
    name: 'Marcelo Ebrard Casaubón',
    party: 'MORENA',
    image: 'https://picsum.photos/seed/marcelo/400/400',
    bio: 'Político e internacionalista mexicano. Ex Secretario de Relaciones Exteriores y Ex Jefe de Gobierno del Distrito Federal.',
    roles: [
      { title: 'Secretario de Relaciones Exteriores', period: '2018 - 2023' },
      { title: 'Jefe de Gobierno del DF', period: '2006 - 2012' },
      { title: 'Secretario de Seguridad Pública DF', period: '2002 - 2004' }
    ],
    votes: [
      { subject: 'Ratificación T-MEC', result: 'A favor', date: '2019-06-19' },
      { subject: 'Ley de Seguridad Interior', result: 'Abstención', date: '2017-12-15' }
    ],
    initiatives: [
      { title: 'Control de Armas Transfronterizo', status: 'Pendiente', date: '2021-08-04', description: 'Demanda contra fabricantes de armas en EEUU.' },
      { title: 'Matrimonio Igualitario DF', status: 'Aprobada', date: '2009-12-21', description: 'Legalización del matrimonio entre personas del mismo sexo en la capital.' }
    ]
  },
  {
    id: 'beatriz-paredes',
    name: 'Beatriz Paredes Rangel',
    party: 'PRI',
    image: 'https://picsum.photos/seed/beatriz/400/400',
    bio: 'Socióloga, diplomática y política mexicana. Ha sido Presidenta del PRI, Gobernadora de Tlaxcala y Embajadora en Brasil.',
    roles: [
      { title: 'Senadora de la República', period: '2018 - Presente' },
      { title: 'Embajadora en Brasil', period: '2012 - 2016' },
      { title: 'Presidenta del PRI', period: '2007 - 2011' },
      { title: 'Gobernadora de Tlaxcala', period: '1987 - 1992' }
    ],
    votes: [
      { subject: 'Militarización GN', result: 'En contra', date: '2022-09-20' },
      { subject: 'Ley Olimpia', result: 'A favor', date: '2020-11-05' }
    ],
    initiatives: [
      { title: 'Protección al Maíz Nativo', status: 'Aprobada', date: '2020-03-24', description: 'Ley federal para el fomento y protección del maíz nativo.' },
      { title: 'Apoyo al Campo', status: 'Pendiente', date: '2023-02-10', description: 'Subsidios directos para fertilizantes.' }
    ]
  },
  {
    id: 'samuel-garcia',
    name: 'Samuel García Sepúlveda',
    party: 'Movimiento Ciudadano',
    image: 'https://picsum.photos/seed/samuel/400/400',
    bio: 'Abogado y político mexicano. Gobernador de Nuevo León. Anteriormente Senador y Diputado Local.',
    roles: [
      { title: 'Gobernador de Nuevo León', period: '2021 - Presente' },
      { title: 'Senador de la República', period: '2018 - 2020' },
      { title: 'Diputado Local Nuevo León', period: '2015 - 2018' }
    ],
    votes: [
      { subject: 'Pacto Fiscal', result: 'A favor', date: '2020-10-05' },
      { subject: 'Eliminación del Fuero', result: 'A favor', date: '2019-05-15' }
    ],
    initiatives: [
      { title: 'Nueva Constitución NL', status: 'Aprobada', date: '2022-09-30', description: 'Reforma integral a la constitución estatal.' },
      { title: 'Impuesto Verde', status: 'Aprobada', date: '2021-12-15', description: 'Impuestos a empresas contaminantes.' }
    ]
  }
];