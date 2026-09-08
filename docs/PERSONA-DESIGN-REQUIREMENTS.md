# CareSmartz360 Design System — Persona Design Requirements & UX Problem-Solving Guide

**Version:** 2.0.0  
**Status:** Canonical Living Standard (Aligned with Living Rulebook Rules 4.3 & 4.4, C360-45362, C360-3526)  
**Upstream Authority:** `Office_Work/memory/PERSONA-MULTI-MODEL-AUDIT-AND-UX-GUIDE.md` & `Office_Work/memory/DEEP-PRODUCT-AND-PERSONA-FORENSICS.md`  
**Applicable Repositories:** `caresmartz360-design-system`, `OfficeSettings-UI`, `caregiver-mobile-app`, `caresmartz360-client-portal`, `aegis`, `AssessmentForms`, `Wound Management`

---

## 1. Executive Summary & Design System Integration

This specification provides the design-token-grounded standard for designing, implementing, and verifying user interfaces across all **CareSmartz360 user personas**.

Following an adversarial multi-model audit across clinical, technical, and accessibility dimensions, this framework bridges Figma design tokens directly to real home-care operational realities:
- Prevents cognitive fatigue for high-volume office staff by providing compact data density.
- Prevents clinical documentation errors by providing collapsible, auto-saving forms.
- Eliminates mis-taps and unreadable screens for senior care recipients with 48px+ touch targets and WCAG AAA 7:1 contrast.
- Protects Protected Health Information (PHI) via role-scoped masking properties (`displayNameOption`).

---

## 2. The Comprehensive 16-Persona Matrix

| # | Persona | Primary Portal / Repository | Form Factor | Density Mode | Min. Touch Target | Accessibility Tier | PHI Exposure Scope |
|---|---|---|---|---|---|---|---|
| 1 | **Agency Executive / Owner** | Agency Portal (`OfficeSettings-UI`) | Desktop / Tablet | Comfortable | 36px | WCAG AA (4.5:1) | Financial Aggregates & Agency Operations |
| 1b| **Franchise Enterprise Executive**| Multi-Branch Console (`aegis`) | Desktop Web | Compact | 32px | WCAG AA (4.5:1) | Multi-Office Regional P&L / Float Pools |
| 2 | **Agency Staff Admin** | Agency Portal (`OfficeSettings-UI`) | Desktop Web | Compact | 32px | WCAG AA (4.5:1) | Full Tenant Clinical & Operations |
| 3 | **Scheduling Coordinator** | Agency Portal (`OfficeSettings-UI`) | Desktop Web | Compact | 32px | WCAG AA (4.5:1) | Schedule Master & EVV Exceptions |
| 4 | **Billing Specialist** | Agency Portal (`billing-service`, TDS SQL) | Desktop Web | Ultra-Compact | 30px | WCAG AA (4.5:1) | Full Claims, EDI 837/835, Remittance |
| 5 | **HR & Recruiter** | Agency Portal (`hr-onboarding-service`) | Desktop Web | Comfortable | 36px | WCAG AA (4.5:1) | Caregiver PII, OIG & Lockouts |
| 6 | **Clinical Supervisor (RN/LPN)**| Agency Portal / Tablet (`oasis-ui`) | Desktop / Tablet | Comfortable | 40px | WCAG AA (4.5:1) | Full Clinical, OASIS-E2, MD Orders |
| 7 | **Visiting Field Nurse (RN/LPN)**| Mobile App / Tablet (`field-clinical`) | iOS / Android / Tab | Comfortable | 44px min | WCAG AA (4.5:1) | Assigned Clinical Care, Wounds, Meds |
| 7b| **Visiting Field Therapist (PT/OT/ST)**| Mobile App / Tablet (`field-clinical`)| iOS / Android / Tab | Comfortable | 44px min | WCAG AA (4.5:1) | Therapy Goals, OASIS GG Functional |
| 8 | **Field Assessment Evaluator** | Mobile App / Tablet (`CustomForm-UI`)| iOS / Android / Tab | Comfortable | 40px min | WCAG AA (4.5:1) | In-Home Assessment & Safety Audits |
| 9 | **Direct Caregiver (CNA/HHA/PCA)**| Mobile App (`caregiver-mobile-app`) | iOS / Android | Spacious | **48px min** | WCAG AA (4.5:1) | Assigned Shift ADLs & Clock-In |
| 10| **Live-In & Companion Caregiver**| Mobile App / IVR (`CGPortal`) | iOS / Android / Phone | Comfortable | 44px min | WCAG AA (4.5:1) | Companionship, Mandatory Sleep/Break Logs |
| 11| **Senior Care Recipient / Client**| Client Portal (`mobile-client-app`) | iOS / Android / Web | Spacious | **48px min** | **WCAG AAA (7:1)**| Personal Schedule, Care Plan, Caregiver Bio |
| 11b| **Pediatric / IDD Client & Guardian**| Client Portal (`caresmartz360-client-portal`)| iOS / Android / Web | Comfortable | 44px min | WCAG AA (4.5:1) | Legal Guardian Proxy, Pediatric Vitals |
| 12| **Family Member / Proxy** | Family Portal (`caresmartz360-client-portal`)| iOS / Android / Web | Comfortable | 44px min | WCAG AA (4.5:1) | Permitted Care Notes, Payment Invoices |
| 13| **Third-Party Payer Case Manager**| Payer Portal (`payer-gateway`) | Desktop Web | Compact | 36px | WCAG AA (4.5:1) | Adjudicated Claims & Authorization Capping |

---

## 3. Density Tokens & Layout Spacing

Components must consume the standard CSS density tokens defined in `semantic-tokens.scss`:

```scss
/* Density Variable Profiles */
:root[data-density="compact"] {
  --table-row-height: 34px;
  --table-cell-padding-y: 6px;
  --table-cell-padding-x: 12px;
  --form-field-height: 32px;
  --form-field-font-size: 13px;
  --spacing-component-gap: 8px;
}

:root[data-density="comfortable"] {
  --table-row-height: 44px;
  --table-cell-padding-y: 10px;
  --table-cell-padding-x: 16px;
  --form-field-height: 40px;
  --form-field-font-size: 14px;
  --spacing-component-gap: 12px;
}

:root[data-density="spacious"] {
  --table-row-height: 56px;
  --table-cell-padding-y: 14px;
  --table-cell-padding-x: 20px;
  --form-field-height: 48px;
  --form-field-font-size: 16px;
  --spacing-component-gap: 16px;
  --touch-target-min: 48px;
}
```

---

## 4. Accessibility & Contrast Standards

### 4.1 Senior Client Portal (WCAG AAA Strict)
- **Contrast Ratio:** Text and interactive elements must satisfy a minimum **7.0:1** contrast ratio against backgrounds.
- **Typography:** Base font size must be at least `16px` (1rem), scalable via OS dynamic text settings up to 200% without clipping or layout breaking.
- **Color Independence:** Never use color alone to indicate status (e.g. shifts, alerts, vitals). All status badges must pair an explicit icon and text label.
- **Touch Target Buffer:** Minimum 48x48px touch target with at least 8px clearance between adjacent interactive elements.

### 4.2 Universal High-Contrast Mode (Living Rulebook Rule 2.2)
- Clinical alert badges (e.g., wound infection alert, vital out-of-range, fall risk) in High Contrast mode must render full white text (`#FFFFFF`) with a `2px solid #FFFF00` high-visibility border on dark surfaces.
- Low-contrast dark red text on dark backgrounds is strictly prohibited.

---

## 5. Protected Health Information (PHI) Masking Standards

Every component presenting patient or caregiver identity must obey role-level masking properties governed by `displayNameOption`:

1. **Caregiver Facing Clients:**
   - Default: `First Name + Last Initial` (e.g., "Sarah M.").
   - Never display caregiver personal cell phone or home address to clients.
2. **Client Facing Caregivers:**
   - Pre-shift confirmation: Display schedule window and general zone/city only.
   - Active shift (post-arrival): Display full service address and gate access codes.
3. **Billing Specialist / Payer:**
   - Adjudication views: Display Patient ID + Full Name for 837/CMS-1500 generation.
   - Payer portal views: Strip unnecessary medical history; display only authorized claim diagnosis codes (ICD-10).
4. **Super Admin / Ops (Cross-Tenant):**
   - System telemetry and error logs must replace patient identifiers with deterministic hashed UUIDs (`client_hash_id`).

---

## 6. How Personas Solve Real UX Problems Across Portals

### 6.1 Schedulers & EVV Exception Queue
- **Problem:** Schedulers spend 40% of their workday reconciling EVV clock exceptions under intense time pressure.
- **Design Resolution:**
  - High-density data grid (34px rows) displaying shift status, geofence delta, and time variance at a glance.
  - One-click exception resolution modal with standardized CMS/state reason codes.

### 6.2 Mobile Caregivers & Offline-First Resilience
- **Problem:** Caregivers frequently visit rural homes or basements with zero cellular reception.
- **Design Resolution:**
  - Dedicated visual sync banner (`Synced`, `Saved Offline`, `Syncing...`).
  - Clock-in/out buttons remain interactive offline using local SQLite caching and cryptographic timestamps.
  - Large 48x48px hit targets to accommodate gloved hands or hurried entry.

### 6.3 Clinical Assessments (OASIS & Wound Management)
- **Problem:** 130+ clinical items create extreme cognitive fatigue for visiting nurses.
- **Design Resolution:**
  - Section-based collapsible accordions with progress indicators.
  - 15-second background auto-save to prevent data loss during interruptions.
  - High-contrast clinical alert badges conforming to Rule 2.2 (`2px solid #FFFF00`).

### 6.4 Medicaid Clients vs. Private-Pay Clients
- **Problem:** Private-pay clients need invoicing and credit card checkout; Medicaid clients have capped hours and cannot be billed directly.
- **Design Resolution:**
  - Dynamic client portal header: Private-pay clients see "Pay Balance" button; Medicaid clients see **"Authorized Hours Remaining"** visual meter.

---

## 7. Pre-Implementation Checklist for AI Agents & Designers

Before generating or updating any component in the CareSmartz360 Design System:
- [ ] Identify which of the **16 personas** will consume this component.
- [ ] Verify that the required **density token** (`compact`, `comfortable`, `spacious`) is bound via CSS custom properties.
- [ ] Confirm mobile/touch targets meet **48px minimum** if used by Caregiver or Client personas.
- [ ] Check contrast ratios using automated audits (`verify-a11y`) to ensure WCAG AA (or AAA for Senior Client).
- [ ] Ensure offline states and sync indicators are provided for mobile caregiver components.
- [ ] Confirm no hardcoded colors, borders, or padding are introduced outside of `semantic-tokens.scss`.
