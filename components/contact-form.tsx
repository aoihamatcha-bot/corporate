import { RevealText } from "@/components/motion/reveal-text";
import Link from "@/components/site-link";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath, type Locale } from "@/content/i18n";
export function ContactForm({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  const fields = [
    {
      name: "company",
      label: c.contact.company,
      autoComplete: "organization",
      maxLength: 160,
      required: false,
      type: "text",
    },
    {
      name: "name",
      label: c.contact.name,
      autoComplete: "name",
      maxLength: 100,
      required: true,
      type: "text",
    },
    {
      name: "email",
      label: c.contact.email,
      autoComplete: "email",
      maxLength: 254,
      required: true,
      type: "email",
    },
  ];
  return (
    <form
      className="contact-form"
      method="post"
      action={locale === "en" ? "/api/contact?lang=en" : "/api/contact"}
      aria-describedby="contact-status"
    >
      <fieldset disabled aria-label={c.contact.fieldset}>
        <label className="form-field">
          <span>
            <RevealText kind="label">{c.contact.purpose}</RevealText>
            <small>
              <RevealText kind="label">{c.common.required}</RevealText>
            </small>
          </span>
          <select name="purpose" required defaultValue="">
            <option value="">{c.contact.select}</option>
            {c.contact.purposes.map((purpose, i) => (
              <option key={purpose} value={String(i)}>
                {purpose}
              </option>
            ))}
          </select>
        </label>
        {fields.map((field) => (
          <label className="form-field" key={field.name}>
            <span>
              <RevealText kind="label">{field.label}</RevealText>
              <small>
                <RevealText kind="label">
                  {field.required ? c.common.required : c.common.optional}
                </RevealText>
              </small>
            </span>
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              required={field.required}
            />
          </label>
        ))}
        <label className="form-field">
          <span>
            <RevealText kind="label">{c.contact.message}</RevealText>
            <small>
              <RevealText kind="label">{c.common.required}</RevealText>
            </small>
          </span>
          <textarea name="message" required maxLength={5000} rows={6} />
        </label>
      </fieldset>
      <p className="form-privacy">
        <RevealText kind="body">{c.contact.privacyBefore}</RevealText>
        <Link className="inline-link" href={localizedPath("/privacy", locale)}>
          <RevealText kind="label">{c.pages.privacy.menu}</RevealText>
        </Link>
        <RevealText kind="body">{c.contact.privacyAfter}</RevealText>
      </p>
      <button className="submit-button" type="submit" disabled>
        <RevealText kind="label">{c.contact.disabledSubmit}</RevealText>
      </button>
    </form>
  );
}
