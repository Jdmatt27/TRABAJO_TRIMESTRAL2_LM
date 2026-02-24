// js/equipos.js
// Almacén centralizado de información de equipos (Logos de Football-Data y Estadios Reales de TheSportsDB)

const EQUIPOS_CONFIG = {
    // PREMIER LEAGUE
    'Man. City': { logo: 'https://crests.football-data.org/65.png', rating: 95, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/1v67tu1550917228.jpg' },
    'Arsenal': { logo: 'https://crests.football-data.org/57.png', rating: 92, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/9u8k1i1534065486.jpg' },
    'Liverpool': { logo: 'https://crests.football-data.org/64.png', rating: 90, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/9r6pue1550918118.jpg' },
    'Aston Villa': { logo: 'https://crests.football-data.org/58.png', rating: 80, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/tpxvvw1421490219.jpg' },
    'Tottenham': { logo: 'https://crests.football-data.org/73.png', rating: 83, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/06385q1554311145.jpg' },
    'Man. Utd': { logo: 'https://crests.football-data.org/66.png', rating: 85, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/6vpxrx1550917409.jpg' },
    'Newcastle': { logo: 'https://crests.football-data.org/67.png', rating: 78, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/9sqv8z1534065604.jpg' },
    'Chelsea': { logo: 'https://crests.football-data.org/61.png', rating: 76, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/5999uu1550917631.jpg' },
    'West Ham': { logo: 'https://crests.football-data.org/563.png', rating: 72, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/8stx3v1550918458.jpg' },
    'Brighton': { logo: 'https://crests.football-data.org/397.png', rating: 70, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/868t0q1534065715.jpg' },

    // LA LIGA
    'Real Madrid': { logo: 'https://crests.football-data.org/86.png', rating: 96, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/v0p6u01534062635.jpg' },
    'FC Barcelona': { logo: 'https://crests.football-data.org/81.png', rating: 93, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vpxpxq1421495914.jpg' },
    'Atlético Madrid': { logo: 'https://crests.football-data.org/78.png', rating: 88, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/f0oizl1534062820.jpg' },
    'Real Sociedad': { logo: 'https://crests.football-data.org/89.png', rating: 80, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/wrtpqt1421497211.jpg' },
    'Athletic Club': { logo: 'https://crests.football-data.org/77.png', rating: 78, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vrrruu1421495818.jpg' },
    'Girona FC': { logo: 'https://crests.football-data.org/298.png', rating: 75, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vpxqrr1421496695.jpg' },
    'Real Betis': { logo: 'https://crests.football-data.org/90.png', rating: 72, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vtuwwt1421497127.jpg' },
    'Valencia CF': { logo: 'https://crests.football-data.org/95.png', rating: 70, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/uxtvsq1421497401.jpg' },
    'Villarreal CF': { logo: 'https://crests.football-data.org/94.png', rating: 68, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/stxrrw1421497526.jpg' },
    'Sevilla FC': { logo: 'https://crests.football-data.org/559.png', rating: 65, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/xrpwvq1421497284.jpg' },

    // SERIE A
    'Inter': { logo: 'https://crests.football-data.org/108.png', rating: 92, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vtpqrt1421587399.jpg' },
    'Juventus': { logo: 'https://crests.football-data.org/109.png', rating: 90, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/uxtquw1421588523.jpg' },
    'AC Milan': { logo: 'https://crests.football-data.org/98.png', rating: 88, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vtpqrt1421587399.jpg' },
    'Atalanta': { logo: 'https://crests.football-data.org/102.png', rating: 85, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/rputuq1421586940.jpg' },
    'AS Roma': { logo: 'https://crests.football-data.org/100.png', rating: 82, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/qrsqut1421588656.jpg' },
    'Napoli': { logo: 'https://crests.football-data.org/113.png', rating: 80, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vqsutw1421588764.jpg' },
    'Lazio': { logo: 'https://crests.football-data.org/110.png', rating: 78, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/qrsqut1421588656.jpg' },
    'Fiorentina': { logo: 'https://crests.football-data.org/99.png', rating: 75, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/uvrrqw1421587522.jpg' },

    // BUNDESLIGA
    'Bayer Leverkusen': { logo: 'https://crests.football-data.org/3.png', rating: 90, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/utsqtw1421587635.jpg' },
    'Bayern Munich': { logo: 'https://crests.football-data.org/5.png', rating: 97, stadium: 'https://www.thesportsdb.org/images/media/team/stadium/qxstpt1421588040.jpg' },
    'VfB Stuttgart': { logo: 'https://crests.football-data.org/10.png', rating: 78, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/rtsurv1421587948.jpg' },
    'RB Leipzig': { logo: 'https://crests.football-data.org/721.png', rating: 85, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/pxtpsv1433602167.jpg' },
    'Borussia Dortmund': { logo: 'https://crests.football-data.org/4.png', rating: 82, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/rvuquu1421588147.jpg' },
    'Eintracht Frankfurt': { logo: 'https://crests.football-data.org/19.png', rating: 72, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/tywvru1421588289.jpg' },

    // LIGUE 1
    'PSG': { logo: 'https://crests.football-data.org/524.png', rating: 94, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/qxstpt1421491746.jpg' },
    'OGC Nice': { logo: 'https://crests.football-data.org/523.png', rating: 80, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vxurrx1421492211.jpg' },
    'AS Monaco': { logo: 'https://crests.football-data.org/548.png', rating: 78, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vsvxtu1421492100.jpg' },
    'Lille OSC': { logo: 'https://crests.football-data.org/521.png', rating: 75, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/vxsvxt1421492002.jpg' },
    'Stade Brestois': { logo: 'https://crests.football-data.org/512.png', rating: 72, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/ttvptq1421493035.jpg' },
    'Olympique Lyon': { logo: 'https://crests.football-data.org/523.png', rating: 70, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/stxpxv1421491845.jpg' },

    // DEFAULT
    'Default': { logo: 'https://crests.football-data.org/65.png', rating: 70, stadium: 'https://www.thesportsdb.com/images/media/team/stadium/1v67tu1550917228.jpg' }
};

window.getEquipoData = function(nombre) {
    return EQUIPOS_CONFIG[nombre] || EQUIPOS_CONFIG['Default'];
};

const LIGAS_CONFIG = {
    premier: { name: 'Premier League', logo: 'https://crests.football-data.org/PL.png', teams: ['Man. City','Arsenal','Liverpool','Aston Villa','Tottenham','Man. Utd','Newcastle','Chelsea','West Ham','Brighton'] },
    laliga: { name: 'LaLiga', logo: 'https://crests.football-data.org/PD.png', teams: ['Real Madrid','FC Barcelona','Atlético Madrid','Real Sociedad','Athletic Club','Girona FC','Real Betis','Valencia CF','Villarreal CF','Sevilla FC'] },
    seriea: { name: 'Serie A', logo: 'https://crests.football-data.org/SA.png', teams: ['Inter','Juventus','AC Milan','Atalanta','AS Roma','Napoli','Lazio','Fiorentina'] },
    bundesliga: { name: 'Bundesliga', logo: 'https://crests.football-data.org/BL1.png', teams: ['Bayer Leverkusen','Bayern Munich','VfB Stuttgart','RB Leipzig','Borussia Dortmund','Eintracht Frankfurt'] },
    ligue1: { name: 'Ligue 1', logo: 'https://crests.football-data.org/FL1.png', teams: ['PSG','OGC Nice','AS Monaco','Lille OSC','Stade Brestois','Olympique Lyon'] }
};
