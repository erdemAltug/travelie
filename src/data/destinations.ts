// Travel destinations with their specific checklists

export interface ChecklistItem {
  id: string;
  name: string;
  category: 'documents' | 'clothing' | 'electronics' | 'toiletries' | 'medicine' | 'other';
}

export interface Destination {
  id: string;
  name: string;
  icon: string;
  description: string;
  checklist: ChecklistItem[];
}

export const destinations: Destination[] = [
  {
    id: 'beach',
    name: 'Plaj Tatili',
    icon: '🏖️',
    description: 'Deniz, kum ve güneş keyifi için',
    checklist: [
      { id: 'b1', name: 'Plaj havlusu', category: 'clothing' },
      { id: 'b2', name: 'Güneş kremi (SPF 50+)', category: 'toiletries' },
      { id: 'b3', name: 'Güneş gözlüğü', category: 'clothing' },
      { id: 'b4', name: 'Şapka', category: 'clothing' },
      { id: 'b5', name: 'Deniz ayakkabıları', category: 'clothing' },
      { id: 'b6', name: 'Mayo', category: 'clothing' },
      { id: 'b7', name: 'Kamp sandalyesi', category: 'other' },
      { id: 'b8', name: 'Su şişesi', category: 'other' },
    ],
  },
  {
    id: 'ski',
    name: 'Kayak Tatili',
    icon: '⛷️',
    description: 'Karlı dağlar ve kayak keyfi için',
    checklist: [
      { id: 's1', name: 'Kayak ceketi', category: 'clothing' },
      { id: 's2', name: 'Kayak pantolonu', category: 'clothing' },
      { id: 's3', name: 'Termal iç çamaşır', category: 'clothing' },
      { id: 's4', name: 'Eldiven', category: 'clothing' },
      { id: 's5', name: 'Kafa bandı', category: 'clothing' },
      { id: 's6', name: 'Kayak gözlüğü', category: 'electronics' },
      { id: 's7', name: 'Güneş kremi', category: 'toiletries' },
      { id: 's8', name: 'Nemlendirici', category: 'toiletries' },
    ],
  },
  {
    id: 'business',
    name: 'İş Seyahati',
    icon: '💼',
    description: 'Toplantı ve konferanslar için',
    checklist: [
      { id: 'bu1', name: 'Kimlik/Pasaport', category: 'documents' },
      { id: 'bu2', name: 'İş kartvizitleri', category: 'documents' },
      { id: 'bu3', name: 'Dizüstü bilgisayar', category: 'electronics' },
      { id: 'bu4', name: 'Şarj kablosu', category: 'electronics' },
      { id: 'bu5', name: 'Kravat/cüppe', category: 'clothing' },
      { id: 'bu6', name: 'Kartvizitlik', category: 'other' },
      { id: 'bu7', name: 'Not defteri', category: 'other' },
      { id: 'bu8', name: 'Kahve', category: 'other' },
    ],
  },
  {
    id: 'camping',
    name: 'Kamp Tatili',
    icon: '⛺',
    description: 'Doğa ve açık hava için',
    checklist: [
      { id: 'c1', name: 'Çadır', category: 'other' },
      { id: 'c2', name: 'Uyku tulu', category: 'other' },
      { id: 'c3', name: 'Kamp lambası', category: 'electronics' },
      { id: 'c4', name: 'Pilli lamba', category: 'electronics' },
      { id: 'c5', name: 'İlk yardım çantası', category: 'medicine' },
      { id: 'c6', name: 'Sinek kovucu', category: 'toiletries' },
      { id: 'c7', name: 'Yürüyüş ayakkabısı', category: 'clothing' },
      { id: 'c8', name: 'Su filtreleri', category: 'other' },
    ],
  },
  {
    id: 'city',
    name: 'Şehir Turu',
    icon: '🏙️',
    description: 'Kültür ve gezi için',
    checklist: [
      { id: 'ct1', name: 'Rahatsız ayakkabı', category: 'clothing' },
      { id: 'ct2', name: 'Şarj powerbank', category: 'electronics' },
      { id: 'ct3', name: 'Harita/rehber', category: 'other' },
      { id: 'ct4', name: 'Sırt çantası', category: 'other' },
      { id: 'ct5', name: 'Hafif yağmurluk', category: 'clothing' },
      { id: 'ct6', name: 'Nakit para', category: 'documents' },
      { id: 'ct7', name: 'Kamera', category: 'electronics' },
      { id: 'ct8', name: 'Şapka', category: 'clothing' },
    ],
  },
];

// Default checklist for any trip
export const defaultChecklist: ChecklistItem[] = [
  { id: 'd1', name: 'Pasaport/Kimlik', category: 'documents' },
  { id: 'd2', name: 'Bilet/Rezervasyon', category: 'documents' },
  { id: 'd3', name: 'Cep telefonu', category: 'electronics' },
  { id: 'd4', name: 'Şarj aleti', category: 'electronics' },
  { id: 'd5', name: 'Kredi kartı/Nakit', category: 'documents' },
  { id: 'd6', name: 'Kişisel ilaçlar', category: 'medicine' },
  { id: 'd7', name: 'Diş fırçası', category: 'toiletries' },
  { id: 'd8', name: 'Deodorant', category: 'toiletries' },
];
