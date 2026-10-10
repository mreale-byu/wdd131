/* Machines page: builds the card grid from data, sorts it, and reveals the
   rest on request.  */

const machines = [
  {
    name: 'IBM PC 5150',
    year: 1981,
    maker: 'IBM',
    description: 'IBM built its first personal computer from parts anyone could buy and published the technical reference, so other firms could build compatible machines. That decision turned "PC" into an industry standard rather than one company\'s product.',
    cpu: 'Intel 8088 · 4.77 MHz',
    ram: '16 KB',
    price: 'US$1,565',
    image: 'ibm-pc-5150.webp',
    width: 719,
    height: 576,
    alt: 'An IBM Personal Computer 5150 photographed against a plain grey backdrop: the system unit with two floppy drives, a monitor resting on top of it, and the keyboard in front.',
  },
  {
    name: 'BBC Micro Model B',
    year: 1981,
    maker: 'Acorn',
    description: 'Acorn won the contract for the BBC Computer Literacy Project, and the Micro became the machine a generation of British schoolchildren learned to program on. Its BASIC and its expansion ports made it a teaching tool as much as a computer.',
    cpu: 'MOS 6502 · 2 MHz',
    ram: '32 KB',
    price: '£335',
    image: 'bbc-micro.webp',
    width: 800,
    height: 533,
    alt: 'An Acorn BBC Micro Model B, a beige wedge-shaped computer with a black keyboard and a row of red function keys, on a blue cloth.',
  },
  {
    name: 'ZX Spectrum',
    year: 1982,
    maker: 'Sinclair',
    description: 'Sinclair put a colour computer into British homes for well under £200 by stripping everything to the minimum, down to the rubber keys. The low price built an enormous games industry around the machine, much of it written by teenagers in bedrooms.',
    cpu: 'Zilog Z80A · 3.5 MHz',
    ram: '16 KB or 48 KB',
    price: '£125 (16 KB)',
    image: 'zx-spectrum.webp',
    width: 800,
    height: 588,
    alt: 'A Sinclair ZX Spectrum, a small flat black computer with grey rubber keys and a rainbow stripe across the lower right corner.',
  },
  {
    name: 'Commodore 64',
    year: 1982,
    maker: 'Commodore',
    description: 'Commodore owned its own chip factory, undercut everyone on price, and sold through ordinary shops instead of computer dealers. The result is among the best-selling single computer models ever made, and its SID sound chip still has musicians writing for it.',
    cpu: 'MOS 6510 · 1.02 MHz',
    ram: '64 KB',
    price: 'US$595',
    image: 'commodore-64.webp',
    width: 800,
    height: 452,
    alt: 'A Commodore 64 home computer, its beige case and brown typewriter keyboard photographed against a white background.',
  },
  {
    name: 'Apple IIe',
    year: 1983,
    maker: 'Apple',
    description: 'The IIe carried the Apple II line, which began in 1977, right through the decade. Schools bought it in enormous numbers, and Apple kept it in production for eleven years, until 1993.',
    cpu: 'MOS 6502 · 1.02 MHz',
    ram: '64 KB',
    price: 'US$1,395',
    image: 'apple-iie.webp',
    width: 800,
    height: 800,
    alt: 'An Apple IIe, a cream-coloured wedge with a built-in keyboard and the Apple logo on the front, photographed against a white background.',
  },
  {
    name: 'Compaq Portable',
    year: 1983,
    maker: 'Compaq',
    description: 'Compaq reverse-engineered the IBM PC\'s BIOS in a clean room, documenting that no one who wrote the new code had seen IBM\'s. That let them sell a machine which legally ran IBM\'s software, and proved the PC standard belonged to the industry rather than to IBM.',
    cpu: 'Intel 8088 · 4.77 MHz',
    ram: '128 KB',
    price: 'US$2,995',
    image: 'compaq-portable.webp',
    width: 800,
    height: 533,
    alt: 'A Compaq Portable with its keyboard detached and lying in front, showing the small built-in screen beside two floppy disk drives.',
  },
  {
    name: 'Apple Macintosh',
    year: 1984,
    maker: 'Apple',
    description: 'The first Macintosh brought the graphical interface, the mouse and the 3.5-inch floppy disk to a general audience. It was slow and badly short of memory, but it set the shape of the personal computer that followed.',
    cpu: 'Motorola 68000 · 7.83 MHz',
    ram: '128 KB',
    price: 'US$2,495',
    image: 'macintosh-128k.webp',
    width: 800,
    height: 666,
    alt: 'A Macintosh 128K photographed in 1984, its small screen showing a black and white drawing, with the keyboard and single-button mouse in front.',
  },
  {
    name: 'Amiga 1000',
    year: 1985,
    maker: 'Commodore',
    description: 'Custom chips for graphics and sound gave the Amiga capabilities its rivals could not match, and it multitasked properly years before they did. Television studios used it for on-air graphics well into the 1990s.',
    cpu: 'Motorola 68000 · 7.16 MHz',
    ram: '256 KB',
    price: 'US$1,295',
    image: 'amiga-1000.webp',
    width: 800,
    height: 533,
    alt: 'A complete Commodore Amiga 1000 system photographed against black: the monitor sitting on the system unit, with the keyboard and mouse in front of it.',
  },
  {
    name: 'Atari 520ST',
    year: 1985,
    maker: 'Atari',
    description: 'The ST shipped with MIDI sockets built in, which no rival offered as standard. That single decision made it the machine of choice in recording studios for years afterwards.',
    cpu: 'Motorola 68000 · 8 MHz',
    ram: '512 KB',
    price: 'US$799.99 with monitor',
    image: 'atari-520st.webp',
    width: 800,
    height: 600,
    alt: 'An Atari 520ST on a desk with its monitor showing a game, a joystick, an external floppy drive and the detached keyboard.',
  },
];

const grid = document.querySelector('#machine-grid');
const toolbar = document.querySelector('#machine-toolbar');
const sortField = document.querySelector('#sort-machines');
const statusLine = document.querySelector('#machine-status');

const sorters = {
  year: (a, b) => a.year - b.year || a.name.localeCompare(b.name),
  name: (a, b) => a.name.localeCompare(b.name),
  maker: (a, b) => a.maker.localeCompare(b.maker) || a.year - b.year,
};

const SORT_LABELS = { year: 'year', name: 'name', maker: 'maker' };

/* The site dates anything older than the decade as "Since", so a card stays
   accurate while showing the item belongs to the 1980s. */
const formatMeta = ({ year, maker }) =>
  year < 1980 ? `Since ${year} · ${maker}` : `${year} · ${maker}`;

const createCard = (machine) => `
      <article class="card machine">
        <img src="images/${machine.image}" width="${machine.width}" height="${machine.height}" loading="lazy" alt="${machine.alt}">
        <div class="body">
          <p class="meta">${formatMeta(machine)}</p>
          <h3>${machine.name}</h3>
          <p>${machine.description}</p>
          <dl class="specs">
            <div><dt>CPU</dt><dd>${machine.cpu}</dd></div>
            <div><dt>RAM</dt><dd>${machine.ram}</dd></div>
            <div><dt>Price</dt><dd>${machine.price}</dd></div>
          </dl>
        </div>
      </article>`;

const renderMachines = (list) => {
  grid.innerHTML = list.map(createCard).join('');
};

const update = () => {
  const sorted = [...machines].sort(sorters[sortField.value]);

  renderMachines(sorted);
  statusLine.textContent =
    `Showing all ${sorted.length} machines, sorted by ${SORT_LABELS[sortField.value]}`;
};

toolbar.hidden = false;
sortField.addEventListener('change', update);
update();
