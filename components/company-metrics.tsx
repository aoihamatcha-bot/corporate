import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";
import { metrics } from "@/content/metrics";
import { CountUp } from "@/components/motion/count-up";
import { RevealText } from "@/components/motion/reveal-text";

export function CompanyMetrics({ locale }: { locale: Locale }) {
  const c = getDictionary(locale).metrics;
  return (
    <section
      className="company-metrics"
      aria-labelledby="metrics-heading"
      aria-describedby="metrics-note"
      data-metrics-status={metrics.status}
    >
      <h3 id="metrics-heading">
        <RevealText kind="subtitle">{c.heading}</RevealText>
      </h3>
      <dl className="metrics-grid">
        {metrics.items.map((item, index) => (
          <div className="metric" key={item.id} data-metric={item.id}>
            <dt>
              <RevealText kind="label">{c.items[item.id].label}</RevealText>
            </dt>
            <dd>
              <CountUp value={item.value} locale={locale} index={index} />
              <span className="metric-unit">
                <RevealText kind="label">{c.items[item.id].unit}</RevealText>
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="metrics-note" id="metrics-note">
        <RevealText kind="body">{c.note}</RevealText>
      </p>
    </section>
  );
}
