export interface IProductInterface {
  _id: string;
  nama: string;
  kategori: string;
  image: string;
  stokAwal: number;
  stokPengurangan: number;
  stokPenambahan: number;
  harga: number;
  status: any;
  deskripsi: string;
  discount: number;
  rating: number;
  terjual: number;
  units: string;
  stokMenipis: number;
}

export const PRODUCT_FIELD: IProductInterface = {
  _id: "px",
  nama: "",
  kategori: "",
  image: "",
  stokAwal: 0,
  stokPengurangan: 0,
  stokPenambahan: 0,
  harga: 0,
  status: "",
  deskripsi: "",
  discount: 0,
  rating: 0,
  terjual: 0,
  units: "units",
  stokMenipis: 0,
};
