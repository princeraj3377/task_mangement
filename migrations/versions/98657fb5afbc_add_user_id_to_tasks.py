"""add user_id to tasks

Revision ID: 98657fb5afbc
Revises: 
Create Date: 2026-08-17 01:00:48.424677

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '98657fb5afbc'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('user_tasks', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user_tasks', 'users_table', ['user_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(None, 'user_tasks', type_='foreignkey')
    op.drop_column('user_tasks', 'user_id')
