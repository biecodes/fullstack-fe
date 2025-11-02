interface IModalData {
  show?: boolean;
  approved?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | any;
  fullscreen?: boolean;
  icon?: any;
  title?: string;
  prefixTitle?: boolean;
  description?: string;
  subDescriotion?: string;
  textApproved?: string;
  classDecline?: string;
  classApproved?: string;
  textDecline?: string;
  scrollable?: boolean;
  data?: any;
  type?: string;
  centered?: boolean;
  dialogClassName?: string;
  build_status?: string;
  justify?: any;
  animation?: boolean;
  keyboard?: boolean;
  mode?: "create" | "edit";
  backdrop?: undefined | "static";
  width?: any;
  showTitle?: boolean;
  backgroundIcon?: string;
  widthCustom?: string;
  modalType?: any;
  showTooltipTitle?: boolean;
}

export type { IModalData };
