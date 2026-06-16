'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { useAppSelector } from '@/redux/store/hooks';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface CheckoutSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function CheckoutSection({ block, locale = 'en', localePrefix = '', isEditable, onSave }: CheckoutSectionProps) {
  const props = block.props || {};
  const items = useAppSelector(s => s.cart.items);
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '', nameOnCard: '' });
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [billingSame, setBillingSame] = useState(true);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const steps = [
    { label: getLocalizedString(props.stepShippingLabel, locale), fieldPath: 'props.stepShippingLabel' },
    { label: getLocalizedString(props.stepPaymentLabel, locale), fieldPath: 'props.stepPaymentLabel' },
    { label: getLocalizedString(props.stepReviewLabel, locale), fieldPath: 'props.stepReviewLabel' },
    { label: getLocalizedString(props.stepConfirmationLabel, locale), fieldPath: 'props.stepConfirmationLabel' },
  ];

  const updateShipping = (field: string, value: string) => setShipping(prev => ({ ...prev, [field]: value }));
  const updatePayment = (field: string, value: string) => setPayment(prev => ({ ...prev, [field]: value }));

  const renderShipping = () => (
    <div>
      {onSave ? (
        <EditableText value={getLocalizedString(props.shippingHeading, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingHeading', val)} isEditable={isEditable} tag="h3" className="text-xl font-bold mb-6" placeholder="Shipping heading..." />
      ) : (
        <h3 className="text-xl font-bold mb-6">{getLocalizedString(props.shippingHeading, locale)}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingFirstNameLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingFirstNameLabel', val)} isEditable={isEditable} tag="span" placeholder="First name..." /> : getLocalizedString(props.shippingFirstNameLabel, locale)}</label>
          <input className="form-input" value={shipping.firstName} onChange={e => updateShipping('firstName', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingLastNameLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingLastNameLabel', val)} isEditable={isEditable} tag="span" placeholder="Last name..." /> : getLocalizedString(props.shippingLastNameLabel, locale)}</label>
          <input className="form-input" value={shipping.lastName} onChange={e => updateShipping('lastName', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingEmailLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingEmailLabel', val)} isEditable={isEditable} tag="span" placeholder="Email..." /> : getLocalizedString(props.shippingEmailLabel, locale)}</label>
          <input className="form-input" type="email" value={shipping.email} onChange={e => updateShipping('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingPhoneLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingPhoneLabel', val)} isEditable={isEditable} tag="span" placeholder="Phone..." /> : getLocalizedString(props.shippingPhoneLabel, locale)}</label>
          <input className="form-input" type="tel" value={shipping.phone} onChange={e => updateShipping('phone', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingAddressLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingAddressLabel', val)} isEditable={isEditable} tag="span" placeholder="Address..." /> : getLocalizedString(props.shippingAddressLabel, locale)}</label>
          <input className="form-input" value={shipping.address} onChange={e => updateShipping('address', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingCityLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingCityLabel', val)} isEditable={isEditable} tag="span" placeholder="City..." /> : getLocalizedString(props.shippingCityLabel, locale)}</label>
          <input className="form-input" value={shipping.city} onChange={e => updateShipping('city', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingStateLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingStateLabel', val)} isEditable={isEditable} tag="span" placeholder="State..." /> : getLocalizedString(props.shippingStateLabel, locale)}</label>
          <input className="form-input" value={shipping.state} onChange={e => updateShipping('state', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingZipLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingZipLabel', val)} isEditable={isEditable} tag="span" placeholder="ZIP..." /> : getLocalizedString(props.shippingZipLabel, locale)}</label>
          <input className="form-input" value={shipping.zip} onChange={e => updateShipping('zip', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.shippingCountryLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingCountryLabel', val)} isEditable={isEditable} tag="span" placeholder="Country..." /> : getLocalizedString(props.shippingCountryLabel, locale)}</label>
          <input className="form-input" value={shipping.country} onChange={e => updateShipping('country', e.target.value)} />
        </div>
      </div>
      <label className="flex items-center gap-2 mt-4 text-sm cursor-pointer">
        <input type="checkbox" checked={shipToDifferent} onChange={e => setShipToDifferent(e.target.checked)} />
          {onSave ? <EditableText value={getLocalizedString(props.shipToDifferentLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shipToDifferentLabel', val)} isEditable={isEditable} tag="span" placeholder="Ship to different..." /> : getLocalizedString(props.shipToDifferentLabel, locale)}
        </label>
        <div className="flex justify-end mt-6">
          <button className="btn-primary" onClick={() => setStep(1)}>{onSave ? <EditableText value={getLocalizedString(props.continueButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.continueButtonLabel', val)} isEditable={isEditable} tag="span" placeholder="Continue..." /> : getLocalizedString(props.continueButtonLabel, locale)}</button>
        </div>
    </div>
  );

  const renderPayment = () => (
    <div>
      {onSave ? (
        <EditableText value={getLocalizedString(props.paymentHeading, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentHeading', val)} isEditable={isEditable} tag="h3" className="text-xl font-bold mb-6" placeholder="Payment heading..." />
      ) : (
        <h3 className="text-xl font-bold mb-6">{getLocalizedString(props.paymentHeading, locale)}</h3>
      )}
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.paymentCardNumberLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentCardNumberLabel', val)} isEditable={isEditable} tag="span" placeholder="Card number..." /> : getLocalizedString(props.paymentCardNumberLabel, locale)}</label>
          <input className="form-input" value={payment.cardNumber} onChange={e => updatePayment('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.paymentExpiryLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentExpiryLabel', val)} isEditable={isEditable} tag="span" placeholder="Expiry..." /> : getLocalizedString(props.paymentExpiryLabel, locale)}</label>
            <input className="form-input" value={payment.expiry} onChange={e => updatePayment('expiry', e.target.value)} placeholder="MM/YY" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.paymentCvcLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentCvcLabel', val)} isEditable={isEditable} tag="span" placeholder="CVC..." /> : getLocalizedString(props.paymentCvcLabel, locale)}</label>
            <input className="form-input" value={payment.cvc} onChange={e => updatePayment('cvc', e.target.value)} placeholder="CVC" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{onSave ? <EditableText value={getLocalizedString(props.paymentNameOnCardLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentNameOnCardLabel', val)} isEditable={isEditable} tag="span" placeholder="Name on card..." /> : getLocalizedString(props.paymentNameOnCardLabel, locale)}</label>
          <input className="form-input" value={payment.nameOnCard} onChange={e => updatePayment('nameOnCard', e.target.value)} />
        </div>
      </div>
      <label className="flex items-center gap-2 mt-4 text-sm cursor-pointer">
        <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
        {onSave ? <EditableText value={getLocalizedString(props.paymentBillingSameLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.paymentBillingSameLabel', val)} isEditable={isEditable} tag="span" placeholder="Billing same..." /> : getLocalizedString(props.paymentBillingSameLabel, locale)}
      </label>
      <div className="flex justify-between mt-6">
        <button className="btn-ghost" onClick={() => setStep(0)}>{onSave ? <EditableText value={getLocalizedString(props.backButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.backButtonLabel', val)} isEditable={isEditable} tag="span" placeholder="Back..." /> : getLocalizedString(props.backButtonLabel, locale)}</button>
        <button className="btn-primary" onClick={() => setStep(2)}>{onSave ? <EditableText value={getLocalizedString(props.continueButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.continueButtonLabel', val)} isEditable={isEditable} tag="span" placeholder="Continue..." /> : getLocalizedString(props.continueButtonLabel, locale)}</button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div>
      {onSave ? (
        <EditableText value={getLocalizedString(props.reviewHeading, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewHeading', val)} isEditable={isEditable} tag="h3" className="text-xl font-bold mb-6" placeholder="Review heading..." />
      ) : (
        <h3 className="text-xl font-bold mb-6">{getLocalizedString(props.reviewHeading, locale)}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
          <div className="flex justify-between items-center mb-3">
            {onSave ? (
              <EditableText value={getLocalizedString(props.reviewShippingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewShippingLabel', val)} isEditable={isEditable} tag="h4" className="font-semibold" placeholder="Shipping label..." />
            ) : (
              <h4 className="font-semibold">{getLocalizedString(props.reviewShippingLabel, locale)}</h4>
            )}
            {onSave ? (
              <EditableText value={getLocalizedString(props.reviewEditButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewEditButtonLabel', val)} isEditable={isEditable} tag="span" className="text-xs text-[var(--primary)]" placeholder="Edit..." />
            ) : (
              <button className="text-xs text-[var(--primary)]" onClick={() => setStep(0)}>{getLocalizedString(props.reviewEditButtonLabel, locale)}</button>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{shipping.firstName} {shipping.lastName}</p>
          <p className="text-sm text-[var(--text-secondary)]">{shipping.address}</p>
          <p className="text-sm text-[var(--text-secondary)]">{shipping.city}, {shipping.state} {shipping.zip}</p>
        </div>
        <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
          <div className="flex justify-between items-center mb-3">
            {onSave ? (
              <EditableText value={getLocalizedString(props.reviewPaymentLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewPaymentLabel', val)} isEditable={isEditable} tag="h4" className="font-semibold" placeholder="Payment label..." />
            ) : (
              <h4 className="font-semibold">{getLocalizedString(props.reviewPaymentLabel, locale)}</h4>
            )}
            {onSave ? (
              <EditableText value={getLocalizedString(props.reviewEditButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewEditButtonLabel', val)} isEditable={isEditable} tag="span" className="text-xs text-[var(--primary)]" placeholder="Edit..." />
            ) : (
              <button className="text-xs text-[var(--primary)]" onClick={() => setStep(1)}>{getLocalizedString(props.reviewEditButtonLabel, locale)}</button>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{payment.nameOnCard}</p>
          <p className="text-sm text-[var(--text-secondary)]">**** {payment.cardNumber.slice(-4)}</p>
        </div>
      </div>

      <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-4 mt-4">
        {onSave ? (
          <EditableText value={getLocalizedString(props.reviewItemsLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.reviewItemsLabel', val)} isEditable={isEditable} tag="h4" className="font-semibold mb-3" placeholder="Items label..." />
        ) : (
          <h4 className="font-semibold mb-3">{getLocalizedString(props.reviewItemsLabel, locale)}</h4>
        )}
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-[var(--border)] last:border-0">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-4 mt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderSubtotalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderSubtotalLabel', val)} isEditable={isEditable} tag="span" placeholder="Subtotal..." /> : <span>{getLocalizedString(props.orderSubtotalLabel, locale)}</span>}<span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderShippingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderShippingLabel', val)} isEditable={isEditable} tag="span" placeholder="Shipping..." /> : <span>{getLocalizedString(props.orderShippingLabel, locale)}</span>}<span>{shippingCost === 0 ? (onSave ? <EditableText value={getLocalizedString(props.orderShippingFreeLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderShippingFreeLabel', val)} isEditable={isEditable} tag="span" placeholder="Free..." /> : getLocalizedString(props.orderShippingFreeLabel, locale)) : `$${shippingCost.toFixed(2)}`}</span></div>
          <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderTaxLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderTaxLabel', val)} isEditable={isEditable} tag="span" placeholder="Tax..." /> : <span>{getLocalizedString(props.orderTaxLabel, locale)}</span>}<span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-base border-t border-[var(--border)] pt-2">{onSave ? <EditableText value={getLocalizedString(props.orderTotalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderTotalLabel', val)} isEditable={isEditable} tag="span" placeholder="Total..." /> : <span>{getLocalizedString(props.orderTotalLabel, locale)}</span>}<span>${total.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="btn-ghost" onClick={() => setStep(1)}>{onSave ? <EditableText value={getLocalizedString(props.backButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.backButtonLabel', val)} isEditable={isEditable} tag="span" placeholder="Back..." /> : getLocalizedString(props.backButtonLabel, locale)}</button>
        <button className="btn-primary" onClick={() => setStep(3)}>{onSave ? <EditableText value={getLocalizedString(props.placeOrderButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.placeOrderButtonLabel', val)} isEditable={isEditable} tag="span" placeholder="Place order..." /> : getLocalizedString(props.placeOrderButtonLabel, locale)}</button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center py-12">
      <svg className="w-20 h-20 mx-auto text-green-500 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      {onSave ? (
        <EditableText value={getLocalizedString(props.confirmationHeading, locale) || ''} onSave={(val) => onSave(block.id, 'props.confirmationHeading', val)} isEditable={isEditable} tag="h2" className="text-3xl font-bold mb-3" placeholder="Confirmation heading..." />
      ) : (
        <h2 className="text-3xl font-bold mb-3">{getLocalizedString(props.confirmationHeading, locale)}</h2>
      )}
      {onSave ? (
        <EditableText value={getLocalizedString(props.confirmationMessage, locale) || ''} onSave={(val) => onSave(block.id, 'props.confirmationMessage', val)} isEditable={isEditable} tag="p" className="text-[var(--text-secondary)] max-w-md mx-auto mb-6" placeholder="Confirmation message..." />
      ) : (
        <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">{getLocalizedString(props.confirmationMessage, locale)}</p>
      )}
      {onSave ? (
        <EditableText value={getLocalizedString(props.confirmationOrderNumberLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.confirmationOrderNumberLabel', val)} isEditable={isEditable} tag="p" className="text-sm text-[var(--text-muted)] mb-2" placeholder="Order number label..." />
      ) : (
        <p className="text-sm text-[var(--text-muted)] mb-2">{getLocalizedString(props.confirmationOrderNumberLabel, locale)}</p>
      )}
      <p className="text-lg font-bold mb-8">PK-{Date.now().toString(36).toUpperCase()}</p>
      {onSave ? (
        <EditableText value={getLocalizedString(props.confirmationContinueShoppingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.confirmationContinueShoppingLabel', val)} isEditable={isEditable} tag="span" className="btn-primary inline-flex items-center gap-2" placeholder="Continue shopping..." />
      ) : (
        <Link href={`${localePrefix}/shop`} className="btn-primary inline-flex items-center gap-2">
          {getLocalizedString(props.confirmationContinueShoppingLabel, locale)}
        </Link>
      )}
    </div>
  );

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
          {onSave ? (
            <EditableText value="Home" onSave={(val) => onSave(block.id, 'props.breadcrumbHomeLabel', val)} isEditable={isEditable} tag="span" className="hover:text-[var(--primary)]" placeholder="Home..." />
          ) : (
            <Link href={`${localePrefix}/`} className="hover:text-[var(--primary)]">Home</Link>
          )}
          <span>/</span>
          {onSave ? (
            <EditableText value={getLocalizedString(props.breadcrumbLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.breadcrumbLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text)]" placeholder="Breadcrumb..." />
          ) : (
            <span className="text-[var(--text)]">{getLocalizedString(props.breadcrumbLabel, locale)}</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((stepInfo, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)] text-[var(--text-muted)]'}`}>
                {i < step ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg> : i + 1}
              </div>
              <span className={`text-xs font-medium ${i <= step ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                {onSave ? (
                  <EditableText value={stepInfo.label} onSave={(val) => onSave(block.id, stepInfo.fieldPath, val)} isEditable={isEditable} tag="span" placeholder="Step label..." />
                ) : (
                  stepInfo.label
                )}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-[var(--border)]" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 0 && renderShipping()}
            {step === 1 && renderPayment()}
            {step === 2 && renderReview()}
            {step === 3 && renderConfirmation()}
          </div>

          {step < 3 && (
            <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-6 self-start">
              {onSave ? (
              <EditableText value={getLocalizedString(props.orderSummaryTitle, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderSummaryTitle', val)} isEditable={isEditable} tag="h3" className="font-bold mb-4" placeholder="Order summary..." />
            ) : (
              <h3 className="font-bold mb-4">{getLocalizedString(props.orderSummaryTitle, locale)}</h3>
            )}
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-2 border-b border-[var(--border)] last:border-0">
                  <span className="truncate mr-2">{item.name} x{item.quantity}</span>
                  <span className="flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="space-y-2 text-sm mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderSubtotalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderSubtotalLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text-secondary)]" placeholder="Subtotal..." /> : <span className="text-[var(--text-secondary)]">{getLocalizedString(props.orderSubtotalLabel, locale)}</span>}<span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderShippingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderShippingLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text-secondary)]" placeholder="Shipping..." /> : <span className="text-[var(--text-secondary)]">{getLocalizedString(props.orderShippingLabel, locale)}</span>}<span>{shippingCost === 0 ? (onSave ? <EditableText value={getLocalizedString(props.orderShippingFreeLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderShippingFreeLabel', val)} isEditable={isEditable} tag="span" placeholder="Free..." /> : getLocalizedString(props.orderShippingFreeLabel, locale)) : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between">{onSave ? <EditableText value={getLocalizedString(props.orderTaxLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderTaxLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text-secondary)]" placeholder="Tax..." /> : <span className="text-[var(--text-secondary)]">{getLocalizedString(props.orderTaxLabel, locale)}</span>}<span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base border-t border-[var(--border)] pt-2">{onSave ? <EditableText value={getLocalizedString(props.orderTotalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderTotalLabel', val)} isEditable={isEditable} tag="span" placeholder="Total..." /> : <span>{getLocalizedString(props.orderTotalLabel, locale)}</span>}<span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
