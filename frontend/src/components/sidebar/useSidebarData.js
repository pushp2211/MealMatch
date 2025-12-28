import { mockStats, mockProvider } from "@/data/mockData";
import {
  mockSeekerStats,
  mockSeekerProfile,
} from "@/data/seekerMockData";

export function useSidebarData(role) {
  if (role === "provider") {
    return {
      stats: mockStats,
      profile: mockProvider,
      theme: "primary",
    };
  }

  if (role === "seeker") {
    return {
      stats: mockSeekerStats,
      profile: mockSeekerProfile,
      theme: "primary",
    };
  }

  return {
    stats: null,
    profile: null,
    theme: "primary",
  };
}
