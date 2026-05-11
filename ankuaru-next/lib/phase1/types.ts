import type { UserRole } from "@/lib/auth/users";

/** All roles that can operate in the phase1 supply-chain API (every role except Trader). */
export type Phase1Role = Exclude<UserRole, "Trader">;

export type Field = {
  id: string;
  name: string;
  farmerId: string;
  areaSqm?: number;
  createdAt: string;
  updatedAt: string;
};

export type LotValidationStatus = "PENDING" | "VALIDATED" | "REJECTED";

export type LotStatus =
  | "AT_FARM"
  | "READY_FOR_PROCESSING"
  | "IN_PROCESSING"
  | "IN_TRANSIT"
  | "ACTIVE"
  | "AT_LAB"
  | "READY_FOR_EXPORT"
  | "CLOSED"
  | "QUARANTINED";

export type LotForm = "CHERRY" | "PARCHMENT" | "GREEN" | "BYPRODUCT";

export type ByproductKind = "pulp" | "husk" | "parchment" | "defects" | "moistureLoss";

export type ProcessingMethod = "washed" | "natural";

export type LabStatus = "NOT_REQUIRED" | "PENDING" | "APPROVED" | "FAILED";

export type Lot = {
  id: string;
  publicLotCode: string;
  farmerId: string;
  fieldId?: string;
  form: LotForm;
  weightKg: number;
  status: LotStatus;
  validationStatus: LotValidationStatus;
  labStatus?: LabStatus;
  // Processing fields
  parentLotIds?: string[];
  childLotIds?: string[];
  processingMethod?: ProcessingMethod;
  byproductKind?: ByproductKind;
  // Custody fields (set by transporter)
  custodianId?: string;
  custodianRole?: string;
  createdAt: string;
  updatedAt: string;
};

export type EventType =
  | "PICK"
  | "VALIDATE_LOT"
  | "AGGREGATE"
  | "PROCESS"
  | "DISPATCH"
  | "RECEIPT"
  | "LAB_RESULT"
  | "BANK_APPROVED";

export type Event = {
  id: string;
  type: EventType;
  timestamp: string;
  actorId: string;
  actorRole: Phase1Role;
  inputLotIds: string[];
  outputLotIds: string[];
  metadata?: Record<string, unknown>;
};

export type Vehicle = {
  id: string;
  plateNumber: string;
  ownerName?: string;
  createdAt: string;
  updatedAt: string;
};

export type Driver = {
  id: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type LabResult = {
  id: string;
  lotId: string;
  labUserId: string;
  status: LabStatus;
  score?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type BankReviewStatus =
  | "PENDING_REVIEW"
  | "BACKGROUND_CHECK_IN_PROGRESS"
  | "APPROVED"
  | "REJECTED";

export type BankReview = {
  id: string;
  applicantUserId: string;
  reviewerBankUserId: string;
  reviewStatus: BankReviewStatus;
  financialAssessment?: string;
  backgroundCheckStatus?: string;
  notes?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Phase1Store = {
  fields: Field[];
  lots: Lot[];
  events: Event[];
  vehicles: Vehicle[];
  drivers: Driver[];
  labResults: LabResult[];
  bankReviews: BankReview[];
};
