import users from "@/data/users.json";

export type DemoUser = {
  username: string;
  password: string;
  role: "Trader";
  registeredDate: string;
  modifiedDate: string;
};

export const DEMO_USERS = users as DemoUser[];

export const sanitizeUser = (user: DemoUser) => ({
  username: user.username,
  role: user.role,
  registeredDate: user.registeredDate,
  modifiedDate: user.modifiedDate,
});

export type SanitizedUser = ReturnType<typeof sanitizeUser>;
