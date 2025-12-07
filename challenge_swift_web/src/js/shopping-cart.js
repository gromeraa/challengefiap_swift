document.addEventListener('DOMContentLoaded', function() {
    // Shopping Cart Functionality
    
    // Quantity Controls
    const quantityControls = document.querySelectorAll('.quantity-controls');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const quantitySpan = control.querySelector('.quantity');
        
        minusBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantitySpan.textContent);
            if (currentQty > 1) {
                quantitySpan.textContent = currentQty - 1;
                updateCartTotals();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = currentQty + 1;
            updateCartTotals();
        });
    });
    
    // Remove Items
    const removeBtns = document.querySelectorAll('.remove-btn');
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cartItem = btn.closest('.cart-item');
            cartItem.style.transition = 'opacity 0.3s ease';
            cartItem.style.opacity = '0';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotals();
                updateItemCount();
            }, 300);
        });
    });
    
    // Coupon System
    const couponField = document.querySelector('.coupon-field');
    const applyCouponBtn = document.querySelector('.apply-coupon-btn');
    const appliedCouponsContainer = document.querySelector('.applied-coupons');
    
    const validCoupons = {
        'BEMVINDO10': 10.00,
        'DESCONTO20': 20.00,
        'FRETE15': 15.00,
        'SWIFT30': 30.00
    };
    
    applyCouponBtn.addEventListener('click', () => {
        const couponCode = couponField.value.trim().toUpperCase();
        
        if (validCoupons[couponCode]) {
            // Check if coupon already applied
            const existingCoupon = appliedCouponsContainer.querySelector(`[data-coupon="${couponCode}"]`);
            if (existingCoupon) {
                showCouponMessage('Cupom já aplicado!', 'warning');
                return;
            }
            
            // Add coupon to applied list
            addAppliedCoupon(couponCode, validCoupons[couponCode]);
            couponField.value = '';
            updateCartTotals();
            showCouponMessage(`Cupom ${couponCode} aplicado com sucesso!`, 'success');
        } else {
            showCouponMessage('Cupom inválido!', 'error');
        }
    });
    
    function addAppliedCoupon(code, discount) {
        const couponElement = document.createElement('div');
        couponElement.className = 'applied-coupon';
        couponElement.setAttribute('data-coupon', code);
        couponElement.innerHTML = `
            <span class="coupon-code">${code}</span>
            <span class="coupon-discount">-R$ ${discount.toFixed(2).replace('.', ',')}</span>
            <button class="remove-coupon-btn" onclick="removeCoupon('${code}')">×</button>
        `;
        appliedCouponsContainer.appendChild(couponElement);
    }
    
    function removeCoupon(code) {
        const couponElement = document.querySelector(`[data-coupon="${code}"]`);
        if (couponElement) {
            couponElement.remove();
            updateCartTotals();
        }
    }
    
    // Make removeCoupon globally available
    window.removeCoupon = removeCoupon;
    
    // Select Club Membership
    const membershipBtn = document.querySelector('.membership-btn');
    
    membershipBtn.addEventListener('click', () => {
        // Simulate membership signup
        showCouponMessage('Select Club ativado! Você ganhou 5% de desconto e frete grátis!', 'success');
        
        // Update membership benefits display
        const benefits = document.querySelectorAll('.benefit-item');
        benefits.forEach(benefit => {
            benefit.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Update button
        membershipBtn.textContent = 'Ativado ✓';
        membershipBtn.style.background = '#28a745';
        membershipBtn.disabled = true;
        
        updateCartTotals();
    });
    
    // Update Cart Totals
    function updateCartTotals() {
        let subtotal = 0;
        let itemCount = 0;
        
        // Calculate subtotal from cart items
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const price = parseFloat(item.querySelector('.current-price').textContent.replace('R$ ', '').replace(',', '.'));
            const itemTotal = quantity * price;
            
            // Update item total display
            item.querySelector('.total').textContent = `R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
            
            subtotal += itemTotal;
            itemCount += quantity;
        });
        
        // Calculate discounts
        let totalDiscounts = 0;
        let membershipDiscount = 0;
        let couponDiscount = 0;
        
        // Select Club discount (5%)
        if (membershipBtn.disabled) {
            membershipDiscount = subtotal * 0.05;
        }
        
        // Coupon discounts
        const appliedCoupons = document.querySelectorAll('.applied-coupon');
        appliedCoupons.forEach(coupon => {
            const discountValue = parseFloat(coupon.querySelector('.coupon-discount').textContent.replace('-R$ ', '').replace(',', '.'));
            couponDiscount += discountValue;
        });
        
        totalDiscounts = membershipDiscount + couponDiscount;
        
        // Calculate shipping (free if membership or over R$ 50)
        let shipping = 15.00;
        if (membershipBtn.disabled || subtotal >= 50) {
            shipping = 0;
        }
        
        const finalTotal = subtotal - totalDiscounts + shipping;
        
        // Update displays
        document.querySelector('.item-count').textContent = `${itemCount} itens`;
        document.querySelector('.total-price').textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
        
        // Update order summary
        const summaryLines = document.querySelectorAll('.summary-line');
        
        // Subtotal
        summaryLines[0].querySelector('span:last-child').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        
        // Membership discount
        if (membershipDiscount > 0) {
            summaryLines[1].querySelector('span:last-child').textContent = `-R$ ${membershipDiscount.toFixed(2).replace('.', ',')}`;
            summaryLines[1].style.display = 'flex';
        } else {
            summaryLines[1].style.display = 'none';
        }
        
        // Coupon discount
        if (couponDiscount > 0) {
            summaryLines[2].querySelector('span:last-child').textContent = `-R$ ${couponDiscount.toFixed(2).replace('.', ',')}`;
            summaryLines[2].style.display = 'flex';
        } else {
            summaryLines[2].style.display = 'none';
        }
        
        // Shipping
        summaryLines[3].querySelector('span:last-child').textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        summaryLines[3].querySelector('span:last-child').style.color = shipping === 0 ? '#28a745' : '#333';
        
        // Final total
        summaryLines[4].querySelector('span:last-child').textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
        
        // Update savings info
        const totalSavings = totalDiscounts + (shipping === 0 ? 15 : 0);
        if (totalSavings > 0) {
            document.querySelector('.savings-info span').textContent = `Você economizou R$ ${totalSavings.toFixed(2).replace('.', ',')}!`;
            document.querySelector('.savings-info').style.display = 'block';
        } else {
            document.querySelector('.savings-info').style.display = 'none';
        }
    }
    
    function updateItemCount() {
        let itemCount = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            itemCount += parseInt(item.querySelector('.quantity').textContent);
        });
        document.querySelector('.item-count').textContent = `${itemCount} itens`;
    }
    
    function showCouponMessage(message, type) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `coupon-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                messageDiv.style.background = '#28a745';
                break;
            case 'warning':
                messageDiv.style.background = '#ffc107';
                messageDiv.style.color = '#333';
                break;
            case 'error':
                messageDiv.style.background = '#dc3545';
                break;
        }
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize cart totals
    updateCartTotals();
});
