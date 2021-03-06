export interface IElement {
    number: number;
    name: string;
    configuration: string;
    symbol: string;
}

export const elements: IElement[] = [
    { number: 1, name: 'Hydrogen', symbol: 'H', configuration: '1s1' },
    { number: 2, name: 'Helium', symbol: 'He', configuration: '1s2' },
    { number: 3, name: 'Lithium', symbol: 'Li', configuration: '[He]2s1' },
    { number: 4, name: 'Beryllium', symbol: 'Be', configuration: '[He]2s2' },
    { number: 5, name: 'Boron', symbol: 'B', configuration: '[He]2s22p1' },
    { number: 6, name: 'Carbon', symbol: 'C', configuration: '[He]2s22p2' },
    { number: 7, name: 'Nitrogen', symbol: 'N', configuration: '[He]2s22p3' },
    { number: 8, name: 'Oxygen', symbol: 'O', configuration: '[He]2s22p4' },
    { number: 9, name: 'Fluorine', symbol: 'F', configuration: '[He]2s22p5' },
    { number: 10, name: 'Neon', symbol: 'Ne', configuration: '[He]2s22p6' },
    { number: 11, name: 'Sodium', symbol: 'Na', configuration: '[Ne]3s1' },
    { number: 12, name: 'Magnesium', symbol: 'Mg', configuration: '[Ne]3s2' },
    { number: 13, name: 'Aluminum', symbol: 'Al', configuration: '[Ne]3s23p1' },
    { number: 14, name: 'Silicon', symbol: 'Si', configuration: '[Ne]3s23p2' },
    { number: 15, name: 'Phosphorus', symbol: 'Ps', configuration: '[Ne]3s23p3' },
    { number: 16, name: 'Sulfur', symbol: 'S', configuration: '[Ne]3s23p4' },
    { number: 17, name: 'Chlorine', symbol: 'Cl', configuration: '[Ne]3s23p5' },
    { number: 18, name: 'Argon', symbol: 'Ar', configuration: '[Ne]3s23p6' },
    { number: 19, name: 'Potassium', symbol: 'K', configuration: '[Ar]4s1' },
    { number: 20, name: 'Calcium', symbol: 'Ca', configuration: '[Ar]4s2' },
    { number: 21, name: 'Scandium', symbol: 'Sc', configuration: '[Ar]3d14s2' },
    { number: 22, name: 'Titanium', symbol: 'Ti', configuration: '[Ar]3d24s2' },
    { number: 23, name: 'Vanadium', symbol: 'V', configuration: '[Ar]3d34s2' },
    { number: 24, name: 'Chromium', symbol: 'Cr', configuration: '[Ar]3d54s1' },
    { number: 25, name: 'Manganese', symbol: 'Mn', configuration: '[Ar]3d54s2' },
    { number: 26, name: 'Iron', symbol: 'Fe', configuration: '[Ar]3d64s2' },
    { number: 27, name: 'Cobalt', symbol: 'Co', configuration: '[Ar]3d74s2' },
    { number: 28, name: 'Nickel', symbol: 'Ni', configuration: '[Ar]3d84s2' },
    { number: 29, name: 'Copper', symbol: 'Cu', configuration: '[Ar]3d104s1' },
    { number: 30, name: 'Zinc', symbol: 'Zn', configuration: '[Ar]3d104s2' },
    { number: 31, name: 'Gallium', symbol: 'Ga', configuration: '[Ar]3d104s24p1' },
    { number: 32, name: 'Germanium', symbol: 'Ge', configuration: '[Ar]3d104s24p2' },
    { number: 33, name: 'Arsenic', symbol: 'As', configuration: '[Ar]3d104s24p3' },
    { number: 34, name: 'Selenium', symbol: 'Se', configuration: '[Ar]3d104s24p4' },
    { number: 35, name: 'Bromine', symbol: 'Br', configuration: '[Ar]3d104s24p5' },
    { number: 36, name: 'Krypton', symbol: 'Kr', configuration: '[Ar]3d104s24p6' },
    { number: 37, name: 'Rubidium', symbol: 'Rb', configuration: '[Kr]5s1' },
    { number: 38, name: 'Strontium', symbol: 'Sr', configuration: '[Kr]5s2' },
    { number: 39, name: 'Yttrium', symbol: 'Y', configuration: '[Kr]4d15s2' },
    { number: 40, name: 'Zirconium', symbol: 'Zr', configuration: '[Kr]4d25s2' },
    { number: 41, name: 'Niobium', symbol: 'Nb', configuration: '[Kr]4d45s1' },
    { number: 42, name: 'Molybdenum', symbol: 'Mo', configuration: '[Kr]4d55s1' },
    { number: 43, name: 'Technetium', symbol: 'Tc', configuration: '[Kr]4d55s2' },
    { number: 44, name: 'Ruthenium', symbol: 'Ru', configuration: '[Kr]4d75s1' },
    { number: 45, name: 'Rhodium', symbol: 'Rh', configuration: '[Kr]4d85s1' },
    { number: 46, name: 'Palladium', symbol: 'Pd', configuration: '[Kr]4d10' },
    { number: 47, name: 'Silver', symbol: 'Ag', configuration: '[Kr]4d105s1' },
    { number: 48, name: 'Cadmium', symbol: 'Cd', configuration: '[Kr]4d105s2' },
    { number: 49, name: 'Indium', symbol: 'In', configuration: '[Kr]4d105s25p1' },
    { number: 50, name: 'Tin', symbol: 'Sn', configuration: '[Kr]4d105s25p2' },
    { number: 51, name: 'Antimony', symbol: 'Sb', configuration: '[Kr]4d105s25p3' },
    { number: 52, name: 'Tellurium', symbol: 'Te', configuration: '[Kr]4d105s25p4' },
    { number: 53, name: 'Iodine', symbol: 'I', configuration: '[Kr]4d105s25p5' },
    { number: 54, name: 'Xenon', symbol: 'Xe', configuration: '[Kr]4d105s25p6' },
    { number: 55, name: 'Cesium', symbol: 'Cs', configuration: '[Xe]6s1' },
    { number: 56, name: 'Barium', symbol: 'Ba', configuration: '[Xe]6s2' },
    { number: 57, name: 'Lanthanum', symbol: 'La', configuration: '[Xe]5d16s2' },
    { number: 58, name: 'Cerium', symbol: 'Ce', configuration: '[Xe]4f15d16s2' },
    { number: 59, name: 'Praseodymium', symbol: 'Pr', configuration: '[Xe]4f36s2' },
    { number: 60, name: 'Neodymium', symbol: 'Nd', configuration: '[Xe]4f46s2' },
    { number: 61, name: 'Promethium', symbol: 'Pm', configuration: '[Xe]4f56s2' },
    { number: 62, name: 'Samarium', symbol: 'Sm', configuration: '[Xe]4f66s2' },
    { number: 63, name: 'Europium', symbol: 'Eu', configuration: '[Xe]4f76s2' },
    { number: 64, name: 'Gadolinium', symbol: 'Gd', configuration: '[Xe]4f75d16s2' },
    { number: 65, name: 'Terbium', symbol: 'Tb', configuration: '[Xe]4f96s2' },
    { number: 66, name: 'Dysprosium', symbol: 'Dy', configuration: '[Xe]4f106s2' },
    { number: 67, name: 'Holmium', symbol: 'Ho', configuration: '[Xe]4f116s2' },
    { number: 68, name: 'Erbium', symbol: 'Er', configuration: '[Xe]4f126s2' },
    { number: 69, name: 'Thulium', symbol: 'Tm', configuration: '[Xe]4f136s2' },
    { number: 70, name: 'Ytterbium', symbol: 'Yb', configuration: '[Xe]4f146s2' },
    { number: 71, name: 'Lutetium', symbol: 'Lu', configuration: '[Xe]4f145d16s2' },
    { number: 72, name: 'Hafnium', symbol: 'Hf', configuration: '[Xe]4f145d26s2' },
    { number: 73, name: 'Tantalum', symbol: 'Ta', configuration: '[Xe]4f145d36s2' },
    { number: 74, name: 'Tungsten', symbol: 'W', configuration: '[Xe]4f145d46s2' },
    { number: 75, name: 'Rhenium', symbol: 'Re', configuration: '[Xe]4f145d56s2' },
    { number: 76, name: 'Osmium', symbol: 'Os', configuration: '[Xe]4f145d66s2' },
    { number: 77, name: 'Iridium', symbol: 'Ir', configuration: '[Xe]4f145d76s2' },
    { number: 78, name: 'Platinum', symbol: 'Pt', configuration: '[Xe]4f145d96s1' },
    { number: 79, name: 'Gold', symbol: 'Au', configuration: '[Xe]4f145d106s1' },
    { number: 80, name: 'Mercury', symbol: 'Hg', configuration: '[Xe]4f145d106s2' },
    { number: 81, name: 'Thallium', symbol: 'Tl', configuration: '[Xe]4f145d106s26p1' },
    { number: 82, name: 'Lead', symbol: 'Pb', configuration: '[Xe]4f145d106s26p2' },
    { number: 83, name: 'Bismuth', symbol: 'Bi', configuration: '[Xe]4f145d106s26p3' },
    { number: 84, name: 'Polonium', symbol: 'Po', configuration: '[Xe]4f145d106s26p4' },
    { number: 85, name: 'Astatine', symbol: 'At', configuration: '[Xe]4f145d106s26p5' },
    { number: 86, name: 'Radon', symbol: 'Rn', configuration: '[Xe]4f145d106s26p6' },
    { number: 87, name: 'Francium', symbol: 'Fr', configuration: '[Rn]7s1' },
    { number: 88, name: 'Radium', symbol: 'Ra', configuration: '[Rn]7s2' },
    { number: 89, name: 'Actinium', symbol: 'Ac', configuration: '[Rn]6d17s2' },
    { number: 90, name: 'Thorium', symbol: 'Th', configuration: '[Rn]6d27s2' },
    { number: 91, name: 'Protactinium', symbol: 'Pa', configuration: '[Rn]5f26d17s2' },
    { number: 92, name: 'Uranium', symbol: 'U', configuration: '[Rn]5f36d17s2' },
    { number: 93, name: 'Neptunium', symbol: 'Np', configuration: '[Rn]5f46d17s2' },
    { number: 94, name: 'Plutonium', symbol: 'Pu', configuration: '[Rn]5f67s2' },
    { number: 95, name: 'Americium', symbol: 'Am', configuration: '[Rn]5f77s2' },
    { number: 96, name: 'Curium', symbol: 'Cm', configuration: '[Rn]5f76d17s2' },
    { number: 97, name: 'Berkelium', symbol: 'Bk', configuration: '[Rn]5f97s2' },
    { number: 98, name: 'Californium', symbol: 'Cf', configuration: '[Rn]5f107s2' },
    { number: 99, name: 'Einsteinium', symbol: 'Es', configuration: '[Rn]5f117s2' },
    { number: 100, name: 'Fermium', symbol: 'Fm', configuration: '[Rn]5f127s2' },
    { number: 101, name: 'Mendelevium', symbol: 'Md', configuration: '[Rn]5f137s2' },
    { number: 102, name: 'Nobelium', symbol: 'No', configuration: '[Rn]5f147s2' },
    { number: 103, name: 'Lawrencium', symbol: 'Lr', configuration: '[Rn]5f147s27p1' },
    { number: 104, name: 'Rutherfordium', symbol: 'Rf', configuration: '[Rn]5f146d27s2' },
    { number: 105, name: 'Dubnium', symbol: 'Db', configuration: '[Rn]5f146d37s2' },
    { number: 106, name: 'Seaborgium', symbol: 'Sg', configuration: '[Rn]5f146d47s2' },
    { number: 107, name: 'Bohrium', symbol: 'Bh', configuration: '[Rn]5f146d57s2' },
    { number: 108, name: 'Hassium', symbol: 'Hs', configuration: '[Rn]5f146d67s2' },
    { number: 109, name: 'Meitnerium', symbol: 'Mt', configuration: '[Rn]5f146d77s2' },
    { number: 110, name: 'Darmstadtium', symbol: 'Ds', configuration: '[Rn]5f146d97s1' },
    { number: 111, name: 'Roentgenium', symbol: 'Rg', configuration: '[Rn]5f146d107s1' },
    { number: 112, name: 'Copernium', symbol: 'Cn', configuration: '[Rn]5f146d107s2' },
    { number: 113, name: 'Nihonium', symbol: 'Nh', configuration: '[Rn]5f146d107s27p1' },
    { number: 114, name: 'Flerovium', symbol: 'Fl', configuration: '[Rn]5f146d107s27p2' },
    { number: 115, name: 'Moscovium', symbol: 'Mc', configuration: '[Rn]5f146d107s27p3' },
    { number: 116, name: 'Livermorium', symbol: 'Lv', configuration: '[Rn]5f146d107s27p4' },
    { number: 117, name: 'Tennessine', symbol: 'Ts', configuration: '[Rn]5f146d107s27p5' },
    { number: 118, name: 'Oganesson', symbol: 'Og', configuration: '[Rn]5f146d107s27p6' }
];
