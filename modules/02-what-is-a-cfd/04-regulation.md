# 02.4 — Regulation and Jurisdiction

Regulation is the difference between a leveraged product with guardrails and one without.
It determines your maximum leverage, whether you can lose more than your deposit, whether
your money is segregated, and whether you have any recourse when something goes wrong.

This is the least interesting lesson in the course and one of the most financially
consequential.

## Why the rules exist

Regulators across multiple jurisdictions examined retail CFD outcomes independently and
reached the same conclusion: the majority of clients lost money, losses were often
severe, and marketing understated the risk. The UK FCA, ESMA across the EU, and ASIC in
Australia all introduced substantially similar intervention measures.

The measures below are that response. They are not bureaucratic decoration; each one maps
to a documented pattern of retail harm.

## The retail protections

### 1. Leverage caps

Maximum leverage for retail clients, by instrument class. UK/EU figures; Australia's are
closely aligned.

| Instrument | Max leverage | Margin required |
|---|---|---|
| Major FX pairs | 30:1 | 3.33% |
| Non-major FX, major indices, gold | 20:1 | 5% |
| Other commodities, non-major indices | 10:1 | 10% |
| Individual shares | 5:1 | 20% |
| Cryptocurrencies | 2:1 | 50% |

Before these caps, retail leverage of 200:1 to 500:1 was routinely offered. At 500:1, a
0.2% adverse move eliminates your margin.

### 2. Margin close-out rule

When account equity falls to **50% of the total initial margin** required for your open
positions, the broker must begin closing positions.

This is a floor, not a plan. You should never be anywhere near it; if you are, your
position sizing failed several steps earlier. Module 4.4 does the arithmetic.

### 3. Negative balance protection

**You cannot lose more than the money in your account.** If a violent gap pushes your
account below zero, the broker must write off the deficit.

This is the single most important retail protection. Its absence is what produced the
worst outcomes in the product's history — the January 2015 Swiss franc de-peg left retail
clients owing brokers sums far exceeding their deposits, in some cases life-changing
amounts, and bankrupted at least one broker outright.

It applies **per account**, not per position.

### 4. Marketing restrictions

- No bonuses or trading incentives to retail clients
- Standardised risk warnings on all communications, stating the firm's own percentage of
  losing retail accounts
- No misleading performance claims

If a firm offers you a deposit bonus, it is not operating under these rules. That is a
complete answer about whether to deal with it.

### 5. Client money segregation

Retail client funds must be held in segregated accounts, separate from the firm's own
money, at approved credit institutions. On insolvency, segregated money is not available
to the firm's general creditors.

Segregation is not a guarantee. Reconciliation failures and fraud have both produced
shortfalls historically. It substantially improves your position without eliminating the
risk.

### 6. Compensation schemes

Where the broker fails and segregation proves insufficient:

| Jurisdiction | Scheme | Limit per person |
|---|---|---|
| UK | FSCS | £85,000 |
| EU/EEA | National schemes under ICSD | Typically €20,000 |
| Australia | No direct equivalent for CFDs | — |
| Cyprus | ICF | €20,000 |

The variation is large and worth knowing before choosing where your money sits. A firm
regulated in a jurisdiction with no compensation scheme offers you a materially different
proposition from one covered by the FSCS.

## Professional client status

Brokers may offer to reclassify you as an **elective professional client**. It is usually
framed as an upgrade: higher leverage, more instruments, sometimes better pricing.

To qualify you must meet at least two of three criteria:

1. Significant trading frequency — typically 10 substantial transactions per quarter over
   the previous four quarters
2. A financial instrument portfolio exceeding €500,000
3. At least one year in a professional position in the financial sector requiring
   knowledge of the transactions envisaged

**What you give up:**

- Leverage caps — gone
- Negative balance protection — **gone**
- Standardised risk warnings — gone
- Compensation scheme eligibility — usually gone
- Ombudsman access — usually gone
- The firm's duty to assess appropriateness — reduced

Read that list again with the fourth bullet of the previous section in mind. You are
trading every protection that exists for higher leverage, on a product where 70–85% of
retail clients lose money at the *capped* leverage.

Some brokers market this aggressively, including by encouraging clients to trade enough
to meet criterion 1. If you are being encouraged toward professional status by someone
whose compensation depends on your volume, that is the entire explanation of why.

**For anyone taking a beginners' course, the answer is no.** There is no version of your
situation in which removing negative balance protection is the right call.

## Offshore brokers

You will encounter firms regulated in jurisdictions with minimal requirements, offering
leverage of 500:1 or 1000:1, deposit bonuses, and no restrictions. Common domiciles
include St Vincent and the Grenadines, Vanuatu, the Marshall Islands, Seychelles, and
Belize.

What you are actually accepting:

- No leverage cap, so ruin from a small move is a normal outcome
- **No negative balance protection**, so you can owe money after a gap
- No enforced segregation in some cases
- No compensation scheme
- No effective recourse. A judgment against a shell company in a jurisdiction with no
  meaningful enforcement is worth what it sounds like.
- In some cases, no genuine market access at all

The common failure pattern is not dramatic. Trading works normally, sometimes for months.
The problems start at withdrawal: documentation requirements that expand indefinitely,
processing delays, a bonus term that turns out to lock your balance behind a volume
requirement, or an account frozen for "investigation". Search for withdrawal complaints
about any firm before depositing; the pattern is visible in advance.

**Verify a licence at the source.** Do not trust a badge on the website. Go to the
regulator's own public register:

| Regulator | Register |
|---|---|
| UK FCA | https://register.fca.org.uk |
| CySEC (Cyprus) | https://www.cysec.gov.cy |
| ASIC (Australia) | https://asic.gov.au — Professional Registers |
| BaFin (Germany) | https://www.bafin.de |
| MAS (Singapore) | https://eservices.mas.gov.sg/fid |
| FSCA (South Africa) | https://www.fsca.co.za |

Check the **entity name on your account agreement**, not the brand. Brokers commonly
operate a regulated EU or UK entity and a separate offshore entity under the same brand,
and route clients to whichever suits. The protections you get depend entirely on which
legal entity you contracted with, and it is stated in the paperwork.

## The United States

CFDs are not available to US retail clients. The CFTC and SEC do not permit them, chiefly
because they are off-exchange leveraged contracts without central clearing.

US retail traders can access: exchange-traded futures (CFTC regulated), options,
regulated retail forex with leverage capped at 50:1 on majors, and margin lending on
equities at roughly 2:1.

A firm offering CFDs to a US resident is, by that fact alone, operating outside US law.
Nothing else about it needs investigating.

## Key points

- Retail leverage caps: 30:1 majors, 20:1 minors/indices/gold, 10:1 commodities, 5:1
  shares, 2:1 crypto
- Margin close-out is mandatory at 50% of required initial margin
- Negative balance protection means you cannot lose more than your account
- Bonuses and incentives to retail clients are prohibited under these regimes
- Professional status trades away every protection above for leverage; decline it
- Offshore regulation typically means no protections and no recourse
- Verify the licence of the **specific legal entity** on your agreement, on the
  regulator's own register

## Exercise 02.4

**(a)** State the margin required, in currency, for: $50,000 notional of EUR/USD; $50,000
of Germany 40; $50,000 of an individual share. Then state, for each, the percentage
adverse move that would wipe out that margin.

**(b)** Find the legal entity name on your demo broker's account agreement. Look it up on
the relevant regulator's register. Record: licence number, date issued, permitted
activities, and any disciplinary history. If you cannot find it, note that as the result.

**(c)** A broker emails offering 500:1 leverage, a 50% deposit bonus and professional
account status "to unlock better conditions". List every regulatory red flag and state
what each one tells you about the firm.

---

Next: [Module 02 quiz](quiz.md), then [Module 03 — Contract Mechanics](../03-contract-mechanics/)
