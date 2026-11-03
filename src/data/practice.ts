/** Verified source of clinic facts. User signs and current official profile, 1 Nov 2026. */
export type Confirmation = 'pending' | 'confirmed';
export interface Reviewed<T> {
  value: T | null;
  status: Confirmation;
  confirmedBy: string | null;
  confirmedOn: string | null;
}
export interface PracticeLocation {
  id: string;
  name: Reviewed<string>;
  address: Reviewed<string>;
  mapsUrl: Reviewed<string>;
  mapEmbedUrl: Reviewed<string>;
  coordinates: Reviewed<{ latitude: number; longitude: number }>;
  weeklyHours: Reviewed<Record<string, string>>;
  timezone: 'Asia/Kolkata';
}
const pending = <T>(): Reviewed<T> => ({ value: null, status: 'pending', confirmedBy: null, confirmedOn: null });
const confirmed = <T>(value: T, source = 'User-supplied signs and chat confirmation'): Reviewed<T> => ({
  value, status: 'confirmed', confirmedBy: source, confirmedOn: '2026-11-01',
});
const mapsUrl = 'https://maps.app.goo.gl/Z75rdh9gU4T4Uv2i7';
const mapEmbedUrl = 'https://www.openstreetmap.org/export/embed?bbox=75.78629851341249%2C26.881406758602843%2C75.79938769340517%2C26.888086089120257&layer=mapnik&marker=26.8847458%2C75.7941789';
const weeklyHours = {
  Monday: '8:00-9:00 AM', Tuesday: '8:00-9:00 AM', Wednesday: '8:00-9:00 AM',
  Thursday: '8:00-9:00 AM', Friday: 'Closed', Saturday: '8:00-9:00 AM', Sunday: '9:00-10:00 AM',
};
export const practice = {
  preferredName: confirmed('Dr. Devendra Kumar Shrimal'),
  designation: confirmed('Director - Cardiology', 'User banner and Narayana Health official physician profile'),
  qualifications: confirmed(['MBBS', 'MD (General Medicine)', 'DM (Cardiology)'], 'User banner and Narayana Health official physician profile'),
  currentAffiliation: confirmed('Narayana Hospital, Jaipur'),
  publicPhone: confirmed('+91 94602 00045'),
  secondaryPhone: confirmed('+91 97993 67272'),
  publicEmail: pending<string>(),
  whatsapp: pending<string>(),
  locations: [{
    id: 'home-consultation',
    name: confirmed('Residence clinic'),
    address: confirmed('24-B, Shiva Colony, Jaipur, Rajasthan 302015', 'User banner, supplied Maps listing and chat confirmation'),
    mapsUrl: confirmed(mapsUrl, 'User-supplied clinic Maps link; verified destination'),
    coordinates: confirmed({ latitude: 26.8847458, longitude: 75.7941789 }, 'Exact clinic pin from user-supplied Google Maps listing'),
    mapEmbedUrl: confirmed(mapEmbedUrl, 'OpenStreetMap share embed with the exact clinic coordinates verified from the user-supplied Google Maps listing, 1 November 2026'),
    weeklyHours: confirmed(weeklyHours, 'User OPD sign and explicit weekly schedule confirmation'),
    timezone: 'Asia/Kolkata',
  }] satisfies PracticeLocation[],
  get consultation() { return {
    name: this.locations[0].name.value!,
    addressLines: this.locations[0].address.value!.split(', ').reduce<string[]>((lines, part, i) => {
      if (i < 2) lines[0] = lines[0] ? lines[0] + ', ' + part : part;
      else lines[1] = lines[1] ? lines[1] + ', ' + part : part;
      return lines;
    }, []),
    mapsUrl: this.locations[0].mapsUrl.value!,
    mapEmbedUrl: this.locations[0].mapEmbedUrl.value!,
    coordinates: this.locations[0].coordinates.value!,
    hoursSummary: Object.entries(this.locations[0].weeklyHours.value!).reduce<{ days: string; hours: string }[]>((groups, [day, hours]) => {
      const existing = groups.find(group => group.hours === hours);
      if (existing) existing.days += ', ' + day; else groups.push({ days: day, hours });
      return groups;
    }, []),
    timezoneLabel: 'All timings are in IST.',
    representativesNote: 'Medical representatives: Wednesday and Thursday only.',
  }; },
  get hospital() { return {
    name: this.currentAffiliation.value!,
    role: this.designation.value!,
    profileUrl: 'https://www.narayanahealth.org/c/jaipur/cardiology-adult-cardiac-sciences/dr-devendra-kumar-shrimal',
    scheduleNote: 'The timings listed here are for consultations at the doctor’s residence. Please contact the hospital separately for its appointment schedule.',
  }; },
  booking: {
    mode: 'call-first' as const,
    advisory: 'Please call to confirm consultation timing before you visit. On-call duties may affect availability.',
    requestFormEnabled: false,
    liveSlotsEnabled: false,
  },
  googleReviews: { listingUrl: confirmed(mapsUrl, 'User-supplied doctor listing'), integrationEnabled: false },
};

export const contact = {
  primaryLabel: practice.publicPhone.value!,
  primaryHref: 'tel:' + practice.publicPhone.value!.replace(/[^+\d]/g, ''),
  secondaryLabel: practice.secondaryPhone.value!,
  secondaryHref: 'tel:' + practice.secondaryPhone.value!.replace(/[^+\d]/g, ''),
};

/** Concise practice areas grounded in the hospital profile; full clinical copy reviewed separately. */
export const careAreas = [
  { number: '01', title: 'Cardiology consultations', description: 'A considered conversation about your heart health, concerns and next steps.' },
  { number: '02', title: 'Coronary & interventional care', description: 'Consultation for coronary artery disease and interventional cardiology.' },
  { number: '03', title: 'Heart rhythm & devices', description: 'Assessment and care relating to pacemakers and other cardiac devices.' },
  { number: '04', title: 'Heart failure care', description: 'Consultation and follow-up for people living with heart failure.' },
];
export const questions = [
  { question: 'How do I arrange a consultation?', answer: 'Call either of the listed contact numbers before visiting. Confirm the consultation timing and ask any questions about arranging your visit.' },
  { question: 'Can I visit without calling first?', answer: 'Please call ahead. On-call duties may affect availability, so a quick confirmation can help you avoid an unnecessary journey.' },
  { question: 'Are these timings for Narayana Hospital?', answer: practice.hospital.scheduleNote },
  { question: 'Can I book an appointment on this website?', answer: 'Appointments are currently arranged by phone. Please call the clinic to confirm a suitable time; viewing the schedule on this website does not reserve an appointment.' },
  { question: 'How can I check fees or other visit arrangements?', answer: 'Please ask the clinic when you call. The team can confirm the current arrangements before you travel.' },
  { question: 'When can medical representatives visit?', answer: 'Medical representatives are received on Wednesday and Thursday only. This is separate from the patient consultation schedule.' },
];
