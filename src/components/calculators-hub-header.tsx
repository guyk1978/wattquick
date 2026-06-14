interface CalculatorsHubHeaderProps {
  calculatorCount: number;
  categoryCount: number;
}

export function CalculatorsHubHeader({
  calculatorCount,
  categoryCount,
}: CalculatorsHubHeaderProps) {
  return (
    <header className="calculators-directory-page__header">
      <dl className="calculators-directory-page__stats">
        <div className="calculators-directory-page__stat">
          <dd className="calculators-directory-page__stat-value">
            {calculatorCount}
          </dd>
          <dt className="calculators-directory-page__stat-label">Tools</dt>
        </div>
        <div className="calculators-directory-page__stat">
          <dd className="calculators-directory-page__stat-value">
            {categoryCount}
          </dd>
          <dt className="calculators-directory-page__stat-label">Categories</dt>
        </div>
        <div className="calculators-directory-page__stat">
          <dd className="calculators-directory-page__stat-value">&lt;50ms</dd>
          <dt className="calculators-directory-page__stat-label">Latency</dt>
        </div>
      </dl>
    </header>
  );
}
