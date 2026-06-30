'use client';
import { Component, ReactNode, ErrorInfo } from 'react';

type BlockErrorBoundaryProps = {
  children: ReactNode;
  blockType?: string;
  blockIndex?: number;
};

type BlockErrorBoundaryState = {
  hasError: boolean;
};

export class BlockErrorBoundary extends Component<
  BlockErrorBoundaryProps,
  BlockErrorBoundaryState
> {
  constructor(props: BlockErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): BlockErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `Block render failed (type: ${this.props.blockType}, index: ${this.props.blockIndex}):`,
      error,
      errorInfo
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '16px',
            margin: '16px 0',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '14px',
          }}
        >
          <strong>Block Render Error</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            Failed to render block (type: {this.props.blockType}). Check browser console for
            details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
