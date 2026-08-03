# Variable authority workflow

## Authority rule

The owner-maintained exports in `/Users/netsmartz/Documents/Variables` are the
only input authority for primitive and semantic variable values. AI tools must
not query Figma to infer or correct variable values.

- Primitives are shared once across all portals.
- Agency semantics belong only to Agency.
- Caregiver semantics belong only to Caregiver.
- Staff may share primitives but must receive its own semantic exports later.
- GitHub is the reviewed, versioned company delivery source.
- Jira records governance, counts, checksums, validation, and Git evidence; it
  does not independently redefine values.

## Update procedure

1. Replace the applicable ZIP export in the local authority folder.
2. Run `npm run sync:variables` from the repository.
3. Run `npm run validate` and review every mismatch.
4. Commit the exact exported members plus
   `config/variable-export-manifest.json`.
5. Push the reviewed commit.
6. Update Jira with logical totals, source/archive hashes, artifact hashes,
   validation result, branch, and commit SHA.

On the owner's machine, `npm run verify:variables` performs byte-for-byte
comparisons against every local ZIP member and also verifies archive hashes,
artifact hashes, and token counts. A mismatch is a release blocker and must be
reported to the design-system owner. Set `DS_REQUIRE_LOCAL_AUTHORITY=true` when
a workflow must fail unless the local authority folder is available.

GitHub runners cannot access the owner's Mac. In that environment the same
command uses `manifest-only` mode: it verifies every committed artifact against
the locked SHA-256 and token count in the manifest and explicitly reports that
local authority parity was not checked. CI success therefore proves repository
integrity, while only an owner-machine run proves current local-export parity.

The source folder is intentionally not committed. The exact exported JSON
members and their SHA-256 provenance are committed so every developer and AI
tool can reproduce the same evidence without local Figma access.
