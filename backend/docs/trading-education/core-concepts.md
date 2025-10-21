# Core Portfolio Concepts - Trading Education

A comprehensive guide to essential trading and portfolio management concepts for the True North Trading Platform.

## Table of Contents
1. [Asset Classes](#asset-classes)
2. [Diversification](#diversification)
3. [Home Bias](#home-bias)
4. [Market-Cap Weighting](#market-cap-weighting)
5. [Benchmarks](#benchmarks)
6. [Glidepath](#glidepath)
7. [Rebalancing](#rebalancing)
8. [Dollar-Cost Averaging (DCA)](#dollar-cost-averaging-dca)
9. [Risk Tolerance vs Capacity](#risk-tolerance-vs-capacity)
10. [Time Horizon](#time-horizon)

---

## Asset Classes

### What it means
Big "buckets" of investments that behave similarly—e.g., equities (stocks), bonds, cash (savings/T-bills), plus others like real estate or commodities.

### Why it matters
Each bucket has different risk/return patterns. Mixing them is the foundation of a portfolio.

### Quick example
A 80% equity / 20% bond mix will usually grow faster long-term than 100% bonds, but swing more year to year.

### Implementation in True North Platform
- **Equity allocation**: Global stock ETFs tracking MSCI ACWI or FTSE All-World
- **Bond allocation**: Global aggregate bond ETFs, GBP-hedged for currency stability
- **Cash buffer**: 3-6 months living expenses outside the investment portfolio

---

## Diversification

### What it means
Don't put all your eggs in one basket—own many companies, sectors, and countries.

### Why it matters
Reduces the damage from any single loser; smoother ride without necessarily sacrificing return.

### Quick example
Instead of buying 10 UK stocks, buy a global equity ETF holding thousands of companies across the US, Europe, Asia, EM.

### Implementation in True North Platform
- **Geographic diversification**: Global ETFs covering developed and emerging markets
- **Sector diversification**: Broad market-cap weighted indices naturally diversify across sectors
- **Behavioral monitoring**: Track when retail sentiment concentrates in specific sectors/regions

---

## Home Bias

### What it means
The tendency to overweight your own country's market.

### Why it matters
Increases risk if your domestic market struggles; you miss big parts of global growth.

### Quick example
A UK investor holding mostly FTSE shares is heavily tied to the UK economy; a global fund spreads that risk.

### Implementation in True North Platform
- **Global core**: 60-70% allocation to global ex-UK equity ETFs
- **UK allocation**: 20-30% maximum to UK equities (roughly market-cap weight)
- **Monitoring**: Dashboard shows geographic allocation vs global market weights

---

## Market-Cap Weighting

### What it means
Bigger companies (by market value) take up a bigger slice of an index/ETF. Most broad indices use this.

### Why it matters
It's cheap, rules-based, and reflects the market's consensus.

### Quick example
In a global index, Apple and Microsoft have larger weights than a small-cap retailer because they're worth more.

### Implementation in True North Platform
- **Core holdings**: Market-cap weighted global ETFs as foundation
- **Satellite strategies**: Behavioral agent can identify when market-cap weights become extreme
- **Rebalancing**: Automatic drift monitoring when allocations move away from targets

---

## Benchmarks

### What it means
The yardstick your fund tries to match (e.g., MSCI ACWI, FTSE All-World).

### Why it matters
Lets you judge if the ETF is doing its job. Look at tracking difference (how closely it follows after fees/costs).

### Quick example
If your ETF tracks FTSE All-World and that index is up 10%, you expect the ETF to be ~10% minus costs.

### Implementation in True North Platform
- **Performance tracking**: Compare portfolio returns vs benchmarks
- **ETF selection**: Prioritize low tracking error and tight spreads
- **Reporting**: Monthly performance attribution vs global equity/bond benchmarks

---

## Glidepath

### What it means
A plan for how your stock/bond mix changes as you age or your goals change.

### Why it matters
As the date you need money gets closer, you usually want less volatility.

### Quick example
Age 30: 80/20 equities/bonds → Age 50: 60/40 → Age 65: 40/60.

### Implementation in True North Platform
- **Age-based targets**: Configurable glidepath rules (e.g., 100 - age = equity %)
- **Goal-based adjustments**: Modify allocation based on time to financial goals
- **Automatic prompts**: Annual review notifications for glidepath adjustments

---

## Rebalancing

### What it means
Periodically nudging your current weights back to target.

### Why it matters
Stops the portfolio from drifting too stock-heavy (or bond-heavy) after big moves; keeps risk on target.

### Quick example
Target is 80/20. After a rally you're 86/14. You sell a bit of equities or add new cash to bonds to get back near 80/20. Do it annually or when drift passes, say, ±5 percentage points.

### Implementation in True North Platform
- **Drift monitoring**: Automatic alerts when allocation exceeds ±5% bands
- **Rebalancing suggestions**: Minimal-trade proposals using new cash first
- **Tax efficiency**: Prefer adding new money over selling for tax optimization
- **Execution**: One-click order generation for rebalancing trades

---

## Dollar-Cost Averaging (DCA)

### What it means
Invest the same amount on a schedule (e.g., monthly), regardless of price.

### Why it matters
Reduces "bad timing" anxiety; builds the habit. (Lump-sum often wins statistically if markets rise, but DCA is easier to stick with.)

### Quick example
£500 auto-invest on the 1st of each month into your global equity ETF.

### Implementation in True North Platform
- **Automated scheduling**: Monthly DCA reminders and order preparation
- **Split allocation**: Automatic distribution across equity/bond targets
- **Market timing override**: Behavioral signals can suggest tactical timing adjustments
- **Cost optimization**: Route to lowest-cost share classes and minimize FX fees

---

## Risk Tolerance vs Capacity

### What it means
- **Tolerance**: Emotional—how much loss/volatility you can stomach without bailing.
- **Capacity**: Financial—how much risk you can afford given income stability, savings, time to goal.

### Why it matters
Your mix should respect both.

### Quick example
Two people hate losing money (low tolerance). The one with a stable job and long horizon has higher capacity and can still run a higher equity share than the one who needs funds in 2 years.

### Implementation in True North Platform
- **Risk questionnaire**: Assess both tolerance and capacity during onboarding
- **Stress testing**: Show portfolio behavior in historical downturns
- **Dynamic adjustment**: Modify risk based on changing life circumstances
- **Behavioral monitoring**: Alert when market stress might trigger emotional decisions

---

## Time Horizon

### What it means
When you'll need the money.

### Why it matters
Longer horizons can ride out downturns and use more equities; short horizons need safer assets.

### Quick example
Money needed in 2–3 years? Keep a chunk in cash/short bonds. Retirement 25 years away? A higher equity share makes sense.

### Implementation in True North Platform
- **Goal-based buckets**: Separate allocations for different time horizons
- **Glide path automation**: Gradually reduce risk as goals approach
- **Liquidity management**: Ensure adequate cash for near-term needs
- **Opportunity cost tracking**: Monitor the cost of being too conservative

---

## Key Takeaways for True North Platform Users

1. **Start Simple**: 80/20 global equity/bond split is a solid foundation
2. **Stay Global**: Avoid home bias with international diversification
3. **Keep Costs Low**: Prioritize low-fee ETFs with tight tracking
4. **Rebalance Systematically**: Use rules, not emotions
5. **Time in Market**: DCA and long-term thinking beat market timing
6. **Match Risk to Reality**: Align portfolio risk with your actual situation
7. **Use Technology**: Let the platform handle monitoring and suggestions
8. **Stay Educated**: Understanding these concepts helps you make better decisions

---

## Next Steps

1. Review the [Foreign Markets Guide](foreign-markets-guide.md) for international investing
2. Learn about [Risk Management Basics](risk-management-basics.md) for position sizing
3. Understand [Execution Guide](execution-guide.md) for order types and timing
4. Explore [Portfolio Construction](portfolio-construction.md) for practical allocation strategies

---

*This documentation is part of the True North Trading Platform educational resources. For questions or suggestions, please open an issue in the repository.*
