// js/equipos.js
// Almacén centralizado de información de equipos y estadios

const EQUIPOS_CONFIG = {
    // PREMIER LEAGUE
    'Man. City': { logo: 'https://crests.football-data.org/65.png', rating: 95, stadium: 'https://images.unsplash.com/photo-1629124444585-780962002f23?q=80&w=1200' },
    'Arsenal': { logo: 'https://crests.football-data.org/57.png', rating: 92, stadium: 'https://images.unsplash.com/photo-1599324546522-071c36721516?q=80&w=1200' },
    'Liverpool': { logo: 'https://crests.football-data.org/64.png', rating: 90, stadium: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200' },
    'Aston Villa': { logo: 'https://crests.football-data.org/58.png', rating: 80, stadium: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200' },
    'Tottenham': { logo: 'https://crests.football-data.org/73.png', rating: 83, stadium: 'https://images.unsplash.com/photo-1580133312320-20175d7997a0?q=80&w=1200' },
    'Man. Utd': { logo: 'https://crests.football-data.org/66.png', rating: 85, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    'Newcastle': { logo: 'https://crests.football-data.org/67.png', rating: 78, stadium: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=1200' },
    'Chelsea': { logo: 'https://crests.football-data.org/61.png', rating: 76, stadium: 'https://images.unsplash.com/photo-1614632537190-23e414dcb33d?q=80&w=1200' },
    'West Ham': { logo: 'https://crests.football-data.org/563.png', rating: 72, stadium: 'https://images.unsplash.com/photo-1589485237202-7f452410ad79?q=80&w=1200' },
    'Brighton': { logo: 'https://crests.football-data.org/397.png', rating: 70, stadium: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200' },

    // LA LIGA
    'Real Madrid': { logo: 'https://crests.football-data.org/86.png', rating: 96, stadium: 'https://images.unsplash.com/photo-1544605503-49ca204e1388?q=80&w=1200' },
    'FC Barcelona': { logo: 'https://crests.football-data.org/81.png', rating: 93, stadium: 'https://images.unsplash.com/photo-1536122221558-20ec449b2571?q=80&w=1200' },
    'Atlético Madrid': { logo: 'https://crests.football-data.org/78.png', rating: 88, stadium: 'https://images.unsplash.com/photo-1614632537423-1e6c2e74c3f5?q=80&w=1200' },
    'Real Sociedad': { logo: 'https://crests.football-data.org/89.png', rating: 80, stadium: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200' },
    'Athletic Club': { logo: 'https://crests.football-data.org/77.png', rating: 78, stadium: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200' },
    'Girona FC': { logo: 'https://crests.football-data.org/298.png', rating: 75, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    'Real Betis': { logo: 'https://crests.football-data.org/90.png', rating: 72, stadium: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200' },
    'Valencia CF': { logo: 'https://crests.football-data.org/95.png', rating: 70, stadium: 'https://images.unsplash.com/photo-1589485237202-7f452410ad79?q=80&w=1200' },
    'Villarreal CF': { logo: 'https://crests.football-data.org/94.png', rating: 68, stadium: 'https://images.unsplash.com/photo-1580133312320-20175d7997a0?q=80&w=1200' },
    'Sevilla FC': { logo: 'https://crests.football-data.org/559.png', rating: 65, stadium: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=1200' },

    // SERIE A
    'Inter': { logo: 'https://crests.football-data.org/108.png', rating: 92, stadium: 'https://images.unsplash.com/photo-1599324546522-071c36721516?q=80&w=1200' },
    'Juventus': { logo: 'https://crests.football-data.org/109.png', rating: 90, stadium: 'https://images.unsplash.com/photo-1614632537190-23e414dcb33d?q=80&w=1200' },
    'AC Milan': { logo: 'https://crests.football-data.org/98.png', rating: 88, stadium: 'https://images.unsplash.com/photo-1599324546522-071c36721516?q=80&w=1200' },
    'Atalanta': { logo: 'https://crests.football-data.org/102.png', rating: 85, stadium: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200' },
    'AS Roma': { logo: 'https://crests.football-data.org/100.png', rating: 82, stadium: 'https://images.unsplash.com/photo-1580133312320-20175d7997a0?q=80&w=1200' },
    'Napoli': { logo: 'https://crests.football-data.org/113.png', rating: 80, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    'Lazio': { logo: 'https://crests.football-data.org/110.png', rating: 78, stadium: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=1200' },
    'Fiorentina': { logo: 'https://crests.football-data.org/99.png', rating: 75, stadium: 'https://images.unsplash.com/photo-1614632537190-23e414dcb33d?q=80&w=1200' },

    // BUNDESLIGA
    'Bayer Leverkusen': { logo: 'https://crests.football-data.org/3.png', rating: 90, stadium: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200' },
    'Bayern Munich': { logo: 'https://crests.football-data.org/5.png', rating: 97, stadium: 'https://images.unsplash.com/photo-1614632537423-1e6c2e74c3f5?q=80&w=1200' },
    'VfB Stuttgart': { logo: 'https://crests.football-data.org/10.png', rating: 78, stadium: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200' },
    'RB Leipzig': { logo: 'https://crests.football-data.org/721.png', rating: 85, stadium: 'https://images.unsplash.com/photo-1580133312320-20175d7997a0?q=80&w=1200' },
    'Borussia Dortmund': { logo: 'https://crests.football-data.org/4.png', rating: 82, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    'Eintracht Frankfurt': { logo: 'https://crests.football-data.org/19.png', rating: 72, stadium: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=1200' },

    // LIGUE 1
    'PSG': { logo: 'https://crests.football-data.org/524.png', rating: 94, stadium: 'https://images.unsplash.com/photo-1536122221558-20ec449b2571?q=80&w=1200' },
    'OGC Nice': { logo: 'https://crests.football-data.org/523.png', rating: 80, stadium: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200' },
    'AS Monaco': { logo: 'https://crests.football-data.org/548.png', rating: 78, stadium: 'https://images.unsplash.com/photo-1589485237202-7f452410ad79?q=80&w=1200' },
    'Lille OSC': { logo: 'https://crests.football-data.org/521.png', rating: 75, stadium: 'https://images.unsplash.com/photo-1580133312320-20175d7997a0?q=80&w=1200' },
    'Stade Brestois': { logo: 'https://crests.football-data.org/512.png', rating: 72, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' },
    'Olympique Lyon': { logo: 'https://crests.football-data.org/523.png', rating: 70, stadium: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=1200' },

    // DEFAULT
    'Default': { logo: 'https://via.placeholder.com/150?text=FC', rating: 70, stadium: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' }
};

window.getEquipoData = function(nombre) {
    return EQUIPOS_CONFIG[nombre] || EQUIPOS_CONFIG['Default'];
};

const LIGAS_CONFIG = {
    premier: { name: 'Premier League', teams: ['Man. City','Arsenal','Liverpool','Aston Villa','Tottenham','Man. Utd','Newcastle','Chelsea','West Ham','Brighton'] },
    laliga: { name: 'LaLiga', teams: ['Real Madrid','FC Barcelona','Atlético Madrid','Real Sociedad','Athletic Club','Girona FC','Real Betis','Valencia CF','Villarreal CF','Sevilla FC'] },
    seriea: { name: 'Serie A', teams: ['Inter','Juventus','AC Milan','Atalanta','AS Roma','Napoli','Lazio','Fiorentina'] },
    bundesliga: { name: 'Bundesliga', teams: ['Bayer Leverkusen','Bayern Munich','VfB Stuttgart','RB Leipzig','Borussia Dortmund','Eintracht Frankfurt'] },
    ligue1: { name: 'Ligue 1', teams: ['PSG','OGC Nice','AS Monaco','Lille OSC','Stade Brestois','Olympique Lyon'] }
};
