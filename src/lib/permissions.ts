// DM_DISCORD_IDS entries are comma-separated Discord user IDs, each
// optionally suffixed with ":campaign-slug" to scope that DM to a single
// campaign (e.g. "455879573113012227,300403455971819521:a-veil-of-secrecy").
// An entry with no ":campaign-slug" is a DM for every campaign.
interface DmEntry {
  discordId: string;
  campaign: string | null;
}

function parseDmAllowlist(raw: string | undefined): DmEntry[] {
  return (raw ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [discordId, campaign] = entry.split(':').map((s) => s.trim());
      return { discordId, campaign: campaign || null };
    });
}

export function isDmForCampaign(
  raw: string | undefined,
  discordId: string | null | undefined,
  campaign: string,
): boolean {
  if (!discordId) return false;
  return parseDmAllowlist(raw).some(
    (entry) => entry.discordId === discordId && (entry.campaign === null || entry.campaign === campaign),
  );
}

export function isDmForAnyCampaign(raw: string | undefined, discordId: string | null | undefined): boolean {
  if (!discordId) return false;
  return parseDmAllowlist(raw).some((entry) => entry.discordId === discordId);
}
