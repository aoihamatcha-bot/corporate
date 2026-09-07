import Link from "@/components/site-link";
import { pages } from "@/content/pages";
export function ContactForm() {
  return (
    <form
      className="contact-form"
      method="post"
      action="/api/contact"
      aria-describedby="contact-status"
    >
      <fieldset disabled aria-label="お問い合わせ内容（受付準備中）">
        <label className="form-field">
          <span>
            お問い合わせの目的<small>必須</small>
          </span>
          <select name="purpose" required defaultValue="">
            <option value="">選択してください</option>
            {pages.contact.purposes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>
            会社名<small>任意</small>
          </span>
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label className="form-field">
          <span>
            お名前<small>必須</small>
          </span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label className="form-field">
          <span>
            メールアドレス<small>必須</small>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label className="form-field">
          <span>
            お問い合わせ内容<small>必須</small>
          </span>
          <textarea name="message" required maxLength={5000} rows={6} />
        </label>
      </fieldset>
      <p className="form-privacy">
        個人情報の取り扱いについては、
        <Link className="inline-link" href="/privacy">
          プライバシーポリシー
        </Link>
        に掲載予定です。
      </p>
      <button className="submit-button" type="submit" disabled>
        お問い合わせ受付の準備中です
      </button>
    </form>
  );
}
