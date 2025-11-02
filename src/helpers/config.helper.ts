export const formatRupiah = (angka: any) => {
  if (angka == null) return "Rp 0";
  return "Rp " + new Intl.NumberFormat("id-ID").format(angka);
};

export const formatDate = (dateString: string | Date, showTime: boolean = true) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!showTime) return formattedDate;

  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate}, ${formattedTime}`;
};
