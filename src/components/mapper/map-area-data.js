// https://www.image-map.net/

const clickableAreas = [
  {
    "id": 1,
    "title": "Biceps femoris",
    "shape": "poly",
    "name": "Kaksipäinen reisilihas",
    "description": "Kaksipäinen reisilihas on reiden ulko- ja takapinnalla. - Lihaksen etuosa ojentaa lonkkaa ja polvea ja loitontaa raajaa. - Lihaksen takaosa koukistaa polvea ja loitontaa raajaa sekä ojentaa akillesjänteen kanssa kinnerniveltä.",
    //"fillColor": "#ff000000",
    "strokeColor": "transparent",
    "coords": [725,347,724,365,727,375,738,381,753,386,767,385,780,374,790,359,798,340,802,320,803,303,802,286,799,269,795,251,778,222,765,209,753,193,739,175,731,176,727,181,735,200,745,223,750,238,753,266,752,279,744,294,734,311],
  },
  {
    "id": 2,
    "title": "Semitendinosus",
    "shape": "poly",
    "name": "Puolijänteinenlihas",
    "description": "Ojentaa lonkka-, polvi- ja kinnerniveltä raajan ollessa kuormitettuna - kun raajaa ei kuormiteta, koukistaa polviniveltä, sisäkiertää - ponnistuslihas",
    "strokeColor": "transparent",
    "coords": [776,389,789,393,797,376,806,356,812,336,817,310,818,283,815,257,808,231,796,213,780,199,768,185,761,179,750,175,743,177,753,192,766,209,781,227,796,252,799,267,803,286,804,304,802,323,799,341,792,357,782,371],
  },
  {
    "id": 3,
    "title": "Tensor fasciae latae",
    "shape": "poly",
    "name": "Leveän peitinkalvon jännittäjälihas",
    "description": "Koukistaa lonkkaa, ojentaa polvea, jännittää reiden leveää peitinkalvoa.",
    "strokeColor": "transparent",
    "coords" : [669,207,665,222,665,235,667,250,670,278,673,297,691,304,709,309,729,312,736,308,737,300,733,286,724,274,718,262,710,250,702,234,692,224,682,215],
  },
  {
    "id": 4,
    "title": "Extensor digitorum longus",
    "shape": "poly",
    "name": "Varpaan pitkä ojentajalihas",
    "description": "Ojentaa varvasta ja koukistaa kinnerniveltä.",
    "strokeColor": "transparent",
    "coords": [739,403,728,403,730,420,734,437,740,455,746,472,753,485,762,501,769,500,765,482,761,463,756,443,748,421],
  },
  {
    "id": 5,
    "title": "Extensor digitorum lateralis",
    "shape": "poly",
    "name": "Varpaan ulommainen ojentajalihas",
    "description": "Ojentaa vuohisniveltä.",
    "strokeColor": "transparent",
    "coords": [740,403,753,403,758,416,763,428,767,443,769,459,772,474,774,488,768,494,763,470,758,448,751,426],
  },
  {
    "id": 6,
    "title": "Gastrocnemius",
    "shape": "poly",
    "name": "Kaksoiskantalihas",
    "description": "Kaksi lihasosaa (caput laterale, caput mediale) - gastrocnemiuksen jänne = akillesjänne - koukistaa polviniveltä ja ojentaa kinnerniveltä.",
    "strokeColor": "transparent",
    "coords": [756,403,761,397,772,397,775,409,778,420,781,434,787,453,780,457,773,445,765,431,758,415],
  },
  {
    "id": 7,
    "title": "Gluteus medius",
    "shape": "poly",
    "name": "Keskimmäinen pakaralihas",
    "description": "Ojentaa lonkkaa ja sisäkiertää raajaa.",
    "strokeColor": "transparent",
    "coords": [638,188,654,196,670,207,687,218,704,221,718,221,728,207,727,193,718,179,707,170,698,161,681,154,661,150,640,156,620,161,600,166,593,179,603,188,621,187],
  },
  {
    "id": 8,
    "title": "Gluteus superficialis",
    "shape": "poly",
    "name": "Pinnallinen pakaralihas",
    "description": "Koukistaa lonkkaa ja loitontaa raajaa.",
    "strokeColor": "transparent",
    "coords": [687,218,703,233,707,243,712,252,720,262,726,274,732,285,738,303,744,292,751,280,754,269,752,256,750,243,746,229,741,216,737,204,731,194,728,196,728,204,726,213,720,219,711,222,699,221],
  },
  {
    "id": 9,
    "title": "Latissimus dorsi",
    "shape": "poly",
    "name": "Leveä selkälihas",
    "description": "Olkanivelten koukistus ja raajan taaksevienti. Kiinnitysjänteistä koostuu kainalokaari arcus axillaris",
    "strokeColor": "transparent",
    "coords": [426,290,505,244,591,197,592,184,587,175,574,172,549,172,529,173,506,173,484,167,462,177,441,183,421,187,426,205,428,229,427,256],
  },
  {
    "id": 10,
    "title": "Pectoralis profundus",
    "shape": "poly",
    "name": "Syvä rintalihas",
    "description": "Vartalon kannattajalihas, eturaajan lähennys ja taaksevienti, olkanivelen paikallaanpito ja tukeminen.",
    "strokeColor": "transparent",
    "coords": [414,391,443,391,471,391,500,391,523,388,557,381,523,381,495,375,466,366,440,355,416,345,412,363],
  },
  {
    "id": 11,
    "title": "Trapezius",
    "shape": "poly",
    "name": "Epäkäslihas",
    "description": "Raajan eteen- ja taaksevienti sekä loitonnus. Lapaluun eteenvienti kaularankaosalla ja taaksevienti rintaranka-osalla.",
    "strokeColor": "transparent",
    "coords": [342,218,357,210,375,198,401,190,431,184,460,177,483,167,467,162,445,153,422,145,404,141,382,139,360,136,344,130,325,121,299,109,267,99,285,121,304,143,319,167,332,193],
  },
  {
    "id": 12,
    "title": "Splenius",
    "shape": "poly",
    "name": "Ohjaslihakset",
    "description": "Ojentaa kaulaa ja nostaa päätä, taivuttaa kaulaa ja päätä sivusuunnassa. Tukee koko selkärankaa ja sen tasapainoa.",
    "strokeColor": "transparent",
    "coords": [270,172,295,173,319,171,299,147,281,126,268,113,247,97,224,82,207,74,174,60,184,77,202,96,222,119,242,142],
  },
  {
    "id": 13,
    "title": "Serratus ventralis",
    "shape": "poly",
    "name": "Alemman sahalihaksen kaulaosa",
    "description": "Tärkein vartalon kannattajalihas - kaulan kohottaja ja sisäänhengityksen apulihas.",
    "strokeColor": "transparent",
    "coords": [320,172,297,175,272,173,285,187,299,202,314,218,323,232,329,245,336,234,340,219,337,206,330,190],
  },
  {
    "id": 14,
    "title": "Omotransversarius",
    "shape": "poly",
    "name": "Lapaluu-kannattajanikamalihas",
    "description": "Raajan eteen vienti - kaulan sivulle taivutus.",
    "strokeColor": "transparent",
    "coords": [326,345,323,327,322,310,329,281,331,255,320,231,303,209,244,147,184,78,170,58,153,56,187,99,218,140,244,173,283,223,299,255,306,305,314,332],
  },
  {
    "id": 15,
    "title": "Brachiocephalicus",
    "shape": "poly",
    "name": "Olkavarsipäälihas",
    "description": "Kaularangan koukistus, olkavarren ojennus ja pään sivuttaisliike, nostaa olkaa ja vetää raajaa eteenpäin ja pidentää etujalan askelta.",
    "strokeColor": "transparent",
    "coords": [151,56,141,55,151,77,161,98,173,121,195,144,218,166,240,194,267,232,280,261,287,286,292,310,301,329,312,345,333,359,328,348,312,328,304,306,297,255,282,225,209,130],
  },
  {
    "id": 16,
    "title": "Deltoideus",
    "shape": "poly",
    "name": "Päällimmäinen lapalihas",
    "description": "Koukistaa olkaniveltä.",
    "strokeColor": "transparent",
    "coords": [397,193,376,199,358,211,343,220,334,248,333,264,331,279,326,297,323,316,324,326,338,309,353,292,371,267,392,237,410,205,410,190],
  },
  {
    "id": 17,
    "title": "Triceps brachii",
    "shape": "poly",
    "name": "Kolmipäinen olkavarsilihas",
    "description": "Muodostuu kolmesta lihasosasta: caput longum (kolmipäisen olkalihaksen pitkäpää), caput laterale (kolmipäisen olkalihaksen ulommainen pää), caput mediale (kolmipäisen olkavarren lihaksen sisimmäinen pää). Caput longum - ojentaa kyynärniveltä ja koukistaa olkaniveltä, vie jalkaa taaksepäin. Caput laterale - ojentaa kyynärniveltä. Caput mediale - ojentaa kyynärniveltä ja kyynärpäätä.",
    "strokeColor": "transparent",
    "coords": [326,327,345,306,360,286,382,255,402,225,411,206,412,190,420,189,425,207,426,226,426,252,424,293,418,322,411,362,394,376,374,367,350,342],
  },
  {
    "id": 18,
    "title": "Extensor carpi radialis",
    "shape": "poly",
    "name": "Etupolven värttinäluunpuoleinen ojentajalihas",
    "description": "Ojentaa etupolvea (rannetta) ja koukistaa kyynärniveltä.",
    "strokeColor": "transparent",
    "coords": [346,342,369,365,362,372,358,390,358,411,361,434,352,434,343,407,337,372,340,354],
  },
  {
    "id": 19,
    "title": "Extensor digitorum communis",
    "shape": "poly",
    "name": "Varpaiden yhteinen ojentajalihas",
    "description": "Kolme lihasosaa: caput humerale (olkaluupää), caput radiale (värttinäluupää), caput ulnare (kyynärluupää) - ojentaa etupolvea ja varvasta.",
    "strokeColor": "transparent",
    "coords": [369,367,363,373,360,390,360,410,362,434,369,451,377,476,382,476,385,439,385,419,383,393,378,378],
  },
  {
    "id": 20,
    "title": "Obliquus externus abdominis",
    "shape": "poly",
    "name": "Ulompi vino vatsalihas",
    "description": "Kannattelee vatsaontelon elimiä, avustaa ulostamisessa, synnytysponnistuksissa ja uloshengityksessä.",
    "strokeColor": "transparent",
    "coords": [449,356,492,373,522,368,545,353,570,332,598,300,623,274,644,249,661,229,661,212,652,199,639,193,625,197,613,209,593,235,572,259,554,281,530,301,509,316,483,328,459,339,452,344,448,350],
  },
  {
    "id": 21,
    "title": "Extensor carpi ulnaris",
    "shape": "poly",
    "name": "Etupolven kyynärluunpuoleinen ojentajalihas",
    "description": "Koukistaa etupolvea.",
    "strokeColor": "transparent",
    "coords": [397,379,391,379,386,403,386,426,391,451,397,473,403,474,405,453,408,423,405,400],
  },
];

export const loadAreas = (treatments, side="leftFlank") => {
  const areas = clickableAreas.map(area => {
    const treatment = treatments[side].find(t => t.id === area.id);
    return treatment ? {...area, treatment: treatment.desc, preFillColor:"#ff000050"} : area
  });
  return areas;
};

export default clickableAreas;