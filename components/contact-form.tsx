import { RevealText } from "@/components/motion/reveal-text";
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
            <RevealText kind="label">お問い合わせの目的</RevealText>
            <small>
              <RevealText kind="label">必須</RevealText>
            </small>
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
            <RevealText kind="label">会社名</RevealText>
            <small>
              <RevealText kind="label">任意</RevealText>
            </small>
          </span>
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label className="form-field">
          <span>
            <RevealText kind="label">お名前</RevealText>
            <small>
              <RevealText kind="label">必須</RevealText>
            </small>
          </span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label className="form-field">
          <span>
            <RevealText kind="label">メールアドレス</RevealText>
            <small>
              <RevealText kind="label">必須</RevealText>
            </small>
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
            <RevealText kind="label">お問い合わせ内容</RevealText>
            <small>
              <RevealText kind="label">必須</RevealText>
            </small>
          </span>
          <textarea name="message" required maxLength={5000} rows={6} />
        </label>
      </fieldset>
      <p className="form-privacy">
        <RevealText kind="body">個人情報の取り扱いについては、</RevealText>
        <Link className="inline-link" href="/privacy">
          <RevealText kind="label">プライバシーポリシー</RevealText>
        </Link>
        <RevealText kind="body">に掲載予定です。</RevealText>
      </p>
      <button className="submit-button" type="submit" disabled>
        <RevealText kind="label">お問い合わせ受付の準備中です</RevealText>
      </button>
    </form>
  );
}
