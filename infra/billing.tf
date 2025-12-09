resource "aws_budgets_budget" "cost_control" {
  name         = "budget-mensuel-${var.project_name}"
  budget_type  = "COST"
  limit_amount = "5" # Alerte si on dépasse 5 dollars
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  # Alerte quand on atteint 80% du budget prévu
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.billing_email]
  }

  # Alerte quand on atteint 100% du budget prévisionnel
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.billing_email]
  }
}
