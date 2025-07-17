export const CIRCUITOS = [
    { id: 'choromoro', nombre: 'Circuito Choromoro', color: "#FD5901" },
    { id: 'sur', nombre: 'Circuito Sur', color: "#508E6D" },
    { id: 'valles', nombre: 'Circuito Valles Calchaquies', color: "#9E2D2C" }, // Kept full id from PHP, adjust if 'valles' is strictly needed
    { id: 'yungas', nombre: 'Circuito Yungas', color: "#66ac7c" }
];

export const DESTINOS = {
    choromoro: [
        { id: 2, nombre: 'San Pedro de Colalao' },
        { id: 3, nombre: 'Trancas' }
    ],
    sur: [
        { id: 1, nombre: 'Simoca' },
        { id: 4, nombre: 'La Cocha' },
        { id: 5, nombre: 'Lules' },
        { id: 6, nombre: 'Famaillá' },
        { id: 7, nombre: 'Monteros' },
        { id: 8, nombre: 'Concepción' },
        { id: 9, nombre: 'Alberdi' },
        { id: 10, nombre: 'Bella Vista' },
        { id: 11, nombre: 'Río Colorado' },
        { id: 12, nombre: 'Atahona' },
        { id: 13, nombre: 'Monteagudo' },
        { id: 14, nombre: 'Lamadrid' },
        { id: 15, nombre: 'Taco Ralo' },
        { id: 16, nombre: 'Samay Cochuna' }
    ],
    valles: [
        { id: 17, nombre: 'El Mollar' },
        { id: 18, nombre: 'Tafí del Valle' },
        { id: 19, nombre: 'Amaicha del Valle' },
        { id: 20, nombre: 'Colalao del Valle' },
        { id: 21, nombre: 'Cafayate' }
    ],
    yungas: [
        { id: 22, nombre: 'Yerba Buena' },
        { id: 23, nombre: 'Tafí Viejo' },
        { id: 24, nombre: 'Primera Confitería' },
        { id: 25, nombre: 'Horco Molle' },
        { id: 26, nombre: 'San Javier' },
        { id: 27, nombre: 'Raco y El Siambón' },
        { id: 28, nombre: 'El Cadillal y Rio Loro' }
    ]
};


export const LINEAS = {
    'San Pedro de Colalao': {
        nombre: 'San Pedro de Colalao S.R.L.',
        precio: 7150,
        boleteria: 'Boleteria N°32 de Terminal de Omnibus',
        telefono: '+543814226388',
        horarios: [
            {
                titulo: 'Lunes a sabados',
                ida: ['6:00', '7:00', '09:30', '11', '12:30', '14:10', '15:30', '17:10', '18:30', '20:15', '21:45'],
                vuelta: ['5:20', '8:30', '09:30', '12:00', '13:30', '14:45', '16:30', '18:00', '19:30', '21']
            },
            {
                titulo: 'Domingos y Feriados',
                ida: ['7:00', '9:30', '11:00', '12:30', '15:30', '18:30', '20:15', '21:45'],
                vuelta: ['7:00', '9:30', '12:00', '14:00', '16:30', '18', '19:30', '21']
            }
        ]
    },
    'Trancas': {
        nombre: 'San Pedro de Colalao S.R.L.',
        precio: 5350,
        boleteria: 'Boleteria N°32 de Terminal de Omnibus',
        telefono: '+543814226388',
        horarios: [
            {
                titulo: 'Lunes a sabados',
                ida: ['6:00', '7:00', '09:30', '11', '12:30', '14:10', '15:30', '17:10', '18:30', '20:15', '21.45'],
                vuelta: ['5:20', '6:30', '7:15', '10:00', '12:30', '14:00', '15:15', '17:00', '18:30', '20:00', '21:30']
            },
            {
                titulo: 'Domingos y Feriados',
                ida: ['7:00', '9:30', '11:00', '12:30', '15:30', '18:30', '20:15', '21:45'],
                vuelta: ['7:30', '10:00', '12:30', '14:30', '17', '18:30', '20:00', '21:30']
            }
        ]
    },
    'Simoca': {
        nombre: 'Tradio',
        precio: 4370,
        boleteria: 'Tradio: Boletería Nº 5 | El Simoqueño: Boletería Nº 3',
        telefono: '+543814303036',
        horarios: [
            {
                titulo: 'Lunes a viernes',
                ida: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '12:40', '13:30', '14:00', '14:30', '15:30', '16:30', '17:30', '18:30', '20:00', '21:00', '22:00', '23:10'],
                vuelta: ['04:55', '5:45', '06:00', '06:30', '06:50', '07:10', '8:00', '09:00', '10:00', '11:30', '12:15', '12:30', '13:30', '14:30', '15:00', '16:00', '16:30', '17:30', '18:15', '18:40', '20:00', '20:40']
            },
            {
                titulo: 'Sabados',
                ida: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:40', '12:40', '13:30', '14:00', '14:30', '15:30', '16:30', '17:30', '18:30', '20:00', '21:00', '22:00'],
                vuelta: ['06:00', '6:50', '07:20', '08:00', '08:30', '9:00', '10:00', '11:30', '12:30', '13:30', '14:30', '15:00', '16:00', '16:30', '17:15', '17:30', '18:30', '20:00', '21:00']
            },
            {
                titulo: 'Domingo',
                ida: ['6:30', '8:00', '09:00', '10:00', '11', '12:10', '12:40', '14:00', '15:30', '16:30', '17:30', '18:10', '18:50', '20:00', '21:00', '22:00'],
                vuelta: ['6:45', '08:00', '09:00', '10:00', '11:00', '12:30', '14:30', '16:30', '17:20', '17:30', '18:30', '20:00', '20:30']
            }
        ]
    },
    'La cocha': {
        nombre: 'Exprebus',
        precio: 4850,
        boleteria: 'Boletería Nº 63/64',
        telefono: '+543814285010',
        horarios: [
            {
                titulo: 'Lunes a viernes',
                ida: ['05:30', '08:30', '12:30', '14:30', '17:00', '18:30', '20:45'],
                vuelta: ['04:30', '05:45', '06:25', '09:25', '12:10', '15:50', '19:25', '21:10', '22:00']
            },
            {
                titulo: 'Sábados y domingos',
                ida: ['05:30', '08:30', '12:30', '14:30', '17:00', '18:30', '20:45'],
                vuelta: ['05:45', '06:25', '9:25', '12:10', '15:50', '19:25', '21:10', '22:00']
            }
        ]
    },
    'Lules': {
        nombre: 'El Provincial',
        precio: 1170,
        boleteria: 'Plataforma 49',
        telefono: '',
        horarios: 'Cada 20 minutos aproximadamente.'
    },
    'Famaillá': {
        nombre: 'Exprebus',
        precio: 1900,
        boleteria: 'Boletería Nº 63/64',
        telefono: '+543814285010',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Monteros': {
        nombre: 'Exprebus',
        precio: 2400,
        boleteria: 'Boletería Nº 63/64',
        telefono: '+543814285010',
        horarios: 'Cada 2 Horas.'
    },
    'Concepción': { // Uses colectivo ID 8, horario ID 8. Colectivo ID 17 is commented out.
        nombre: 'Exprebus',
        precio: 3650,
        boleteria: 'Boletería Nº 63/64',
        telefono: '+543814285010',
        horarios: 'Cada 40 minutos aproximadamente.' // Horario ID 8 from Horarios.php
    },
    'Alberdi': {
        nombre: 'Exprebus',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº 63/64',
        telefono: '+543814211830',
        horarios: 'Cada 3 Horas.'
    },
    'Bella Vista': {
        nombre: 'Tradio',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Rio Colorado': {
        nombre: 'Tradio',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Atahona': {
        nombre: 'Tradio',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Monteagudo': {
        nombre: 'Tradio',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Lamadrid': {
        nombre: 'Tradio',
        precio: null, // PHP precio is ''
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Taco Ralo': {
        nombre: 'Tradio',
        precio: 6590,
        boleteria: 'Boletería Nº5',
        telefono: '+543814303036',
        horarios: 'Cada 40 minutos aproximadamente.'
    },
    'Samay Cochuna': {
        nombre: 'Empresa Gutierrez',
        precio: null, // PHP precio is ''
        boleteria: 'Ventanilla 9 de la Empresa.',
        telefono: '+543865628762',
        horarios: 'Jueves y Domingos 8hrs. Con reserva.'
    },
    'El Mollar': { // colectivo ID 20, horario ID 20
        nombre: 'Aconquija',
        precio: 13000,
        boleteria: 'Boletería Nº65',
        telefono: '+543815545563',
        horarios: [
            {
                titulo: 'Lunes a Sábados',
                ida: ['06:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                vuelta: ['05:15', '06:10', '10:10', '14:10', '17:10', '18:10', '21:45']
            },
            {
                titulo: 'Domingos',
                ida: ['06:00', '10:00', '12:00', '14:00', '16:00', '19:00'],
                vuelta: ['10:10', '14:10', '17:10', '18:10', '19:50']
            }
        ]
    },
    'Tafi del Valle': { // colectivo ID 21, horario ID 21
        nombre: 'Aconquija',
        precio: 13000,
        boleteria: 'Boletería Nº65',
        telefono: '+543815545563',
        horarios: [
            {
                titulo: 'Lunes a Sábados',
                ida: ['06:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                vuelta: ['05:00', '06:00', '10:00', '13:50', '16:50', '17:50', '21:35']
            },
            {
                titulo: 'Domingos',
                ida: ['06:00', '10:00', '12:00', '14:00', '16:00', '19:00'],
                vuelta: ['10:00', '13:50', '16:50', '17:50', '19:30', '20:50']
            }
        ]
    },
    'Amaicha del Valle': { // colectivo ID 22, horario ID 22
        nombre: 'Aconquija',
        precio: 17000,
        boleteria: 'Boletería Nº65',
        telefono: '+543815545563',
        horarios: [
            {
                titulo: 'Lunes a Sábados',
                ida: ['06:00', '10:00', '14:00', '18:00', '20:00'],
                vuelta: ['03:15', '08:15', '12:20', '16:20', '20:00']
            },
            {
                titulo: 'Domingos',
                ida: ['06:00', '10:00', '12:00', '14:00', '16:00', '19:00'],
                vuelta: ['08:15', '12:20', '16:20', '19:20']
            }
        ]
    },
    'Colalao del Valle': { // colectivo ID 23, horario ID 23
        nombre: 'Aconquija',
        precio: 22400,
        boleteria: 'Boletería Nº65',
        telefono: '+543815545563',
        horarios: [
            {
                titulo: 'Lunes a Sábados',
                ida: ['06:00', '14:00'],
                vuelta: ['06:00', '12:00', '14:00']
            },
            {
                titulo: 'Domingos',
                ida: ['06:00', '14:00', '19:00'],
                vuelta: ['06:00', '12:00', '14:00']
            }
        ]
    },
    'Cafayate': { // colectivo ID 24, horario ID 24
        nombre: 'Aconquija',
        precio: 25000,
        boleteria: 'Boletería Nº65',
        telefono: '+543814330205',
        horarios: [
            {
                titulo: 'Lunes a Sábados',
                ida: ['06:00', '14:00'],
                vuelta: ['06:00', '14:00']
            },
            {
                titulo: 'Domingos',
                ida: ['06:00', '12:00', '14:00', '19:00'],
                vuelta: ['06:00', '14:00', '18:00']
            }
        ]
    },
    'Yerba Buena': { // colectivo ID 25, horario ID 25
        nombre: 'Linea 118 - 102 - 100',
        precio: 1200,
        boleteria: '118 y 100 por la calle Santiago y 102 por la calle San Lorenzo',
        telefono: '',
        horarios: 'Cada 20 Minutos aproximadamente.'
    },
    'Tafi Viejo': { // colectivo ID 26, horario ID 26
        nombre: 'Linea 130 cartel Ruta 9',
        precio: 1000,
        boleteria: 'Por la calle General Paz',
        telefono: '',
        horarios: 'Cada 20 Minutos aproximadamente.'
    },
    'Primera Confitería': { // colectivo ID 27, horario ID 27
        nombre: 'Linea 118 cartel Primera Confiteria',
        precio: 1339,
        boleteria: 'Por la calle Santiago',
        telefono: '',
        horarios: 'Cada 30 Minutos aproximadamente.'
    },
    'Horco Molle': { // colectivo ID 28, horario ID 28
        nombre: 'Linea 100 cartel HORCO MOLLE',
        precio: 1500,
        boleteria: 'Por la calle Santiago',
        telefono: '',
        horarios: 'Cada 40 Minutos aproximadamente.'
    },
    'San Javier': { // colectivo ID 29, horario ID 29
        nombre: 'Linea 118 - El Portezuelo',
        precio: 'Cristo $2.930 - Monoblock $3.120 - Ciudad Universitaria $3.340 - Cascada $3.770 - Valle $3.940 - Portezuelo $4.630',
        boleteria: 'Pataforma 56-57-58',
        telefono: '+543814257361',
        horarios: [
            {
                titulo: 'Lunes a Viernes (Ida por terminal y vuelta por el Cristo)',
                ida: ['12:00', '16:00', '20:00'],
                vuelta: ['06:00', '14:00', '18:00']
            },
            {
                titulo: 'Sábados (Ida por terminal y vuelta por el Cristo)',
                ida: ['12:00', '16:00'],
                vuelta: ['07:00', '14:00', '18:00']
            },
            {
                titulo: 'Domingos y Feriados (Ida por terminal y vuelta por el Cristo)',
                ida: ['08:00', '12:00', '16:00'],
                vuelta: ['10:00', '14:00', '18:00']
            }
        ]
    },
    'Raco y El Siambón': { // colectivo ID 30, horario ID 30
        nombre: 'Buscor',
        precio: 'Raco $3.520 - El Siambón $4.200',
        boleteria: 'Boletería Nº2',
        telefono: '+543814840040',
        horarios: [
            {
                titulo: 'Lunes a Viernes (Regreso desde EL SIAMBÓN)',
                ida: ['06:00', '9:30', '11', '12:25', '14:00', '17:00', '19:30', '21:00'],
                vuelta: ['06:20', '07:20', '18:30']
            },
            {
                titulo: 'Sábados (Regreso desde EL SIAMBÓN)',
                ida: ['07:00', '09:00', '11:00', '14:00', '17:00', '19:30', '21:00'],
                vuelta: ['08:50', '10:50', '16:50']
            },
            {
                titulo: 'Domingos y Feriados (Regreso desde EL SIAMBÓN)',
                ida: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:30', '21:00'],
                vuelta: ['09:00', '14:00', '17:00']
            },
            {
                titulo: 'Lunes a Viernes (Regreso DESDE NOGALITO)',
                ida: ['06:00', '9:30', '11', '12:25', '14:00', '17:00', '19:30', '21:00'],
                vuelta: ['05:45', '09:00', '12:00', '14:20', '19:00']
            },
            {
                titulo: 'Sábados (Regreso DESDE NOGALITO)',
                ida: ['07:00', '09:00', '11:00', '14:00', '17:00', '19:30', '21:00'],
                vuelta: ['06:30', '14:00', '19:00']
            },
            {
                titulo: 'Domingos y Feriados (Regreso DESDE NOGALITO)',
                ida: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:30', '21:00'],
                vuelta: ['14:00', '19:00']
            }
        ]
    },
    'El Cadillal y Rio Loro': { // colectivo ID 31, horario ID 31
        nombre: 'Buscor',
        precio: 2750,
        boleteria: 'Boletería Nº3 - Plataforma 13-12',
        telefono: '+543814840040',
        horarios: [
            {
                titulo: 'Lunes a Viernes',
                ida: ['06:30', '09:00' , '11:00', '13:00', '15:00', '17:00', '19:30' , '21:30'],
                vuelta: ['06:00', '07:30', '10:30', '12:15', '14:00', '16:00', '18:20', '20:20']
            },
            {
                titulo: 'Sábados',
                ida: ['07:00', '09:00', '11:30', '14:30', '17:00', '19:00'],
                vuelta: ['08:00', '10:15', '12:30', '16:00', '18:00', '20:00']
            },
            {
                titulo: 'Domingos y Feriados',
                ida: ['09:00', '11:30', '14:30', '17:00', '19:00'],
                vuelta: ['10:15', '12:30', '16:00', '18:00', '20:00']
            }
        ]
    }
};
